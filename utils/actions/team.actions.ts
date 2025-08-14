"use server";

import { safeParse } from "zod";
import {
  includeData,
  type newTeamFormData,
  type TeamWithCreatorAndCountMembers,
} from "../types";
import { newTeamFormSchema } from "../zod/zod-schemas";
import { smthWentWrong } from "@/config/helper";
import { prisma } from "@/prisma/prisma";
import { getUserId } from "./helper";

export const createNewTeam = async (values: newTeamFormData) => {
  try {
    const userId = await getUserId();

    const parsedData = safeParse(newTeamFormSchema, values);
    if (parsedData.error) return { error: "Invalid data" };
    const { name, description } = parsedData.data;
    const newTeam = await prisma.team.create({
      data: { name, description, creatorId: userId },
    });
    await prisma.teamMember.create({
      data: { teamId: newTeam.id, userId },
    });
    return { success: "Team created" };
  } catch (error) {
    console.log("Create new team error: ", error);
    return { ...smthWentWrong };
  }
};

export const getOwnTeams = async (): Promise<
  TeamWithCreatorAndCountMembers[]
> => {
  try {
    const userId = await getUserId();
    const ownTeams = await prisma.team.findMany({
      where: { creatorId: userId },
      include: { creator: true, _count: { select: { members: true } } },
    });
    return ownTeams;
  } catch (error) {
    console.log("Get own teams error: ", error);
    return [];
  }
};

export const getMyTeams = async (): Promise<
  TeamWithCreatorAndCountMembers[]
> => {
  try {
    const userId = await getUserId();
    const myTeams = await prisma.team.findMany({
      where: { members: { some: { userId } } },
      include: { creator: true, _count: { select: { members: true } } },
    });
    return myTeams;
  } catch (error) {
    console.log("Get my teams error: ", error);
    return [];
  }
};

export const joinATeam = async (teamId: string) => {
  try {
    const userId = await getUserId();
    const existingTeam = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true },
    });
    if (!existingTeam) return { error: "Team not found" };
    const teamMembers = existingTeam.members.map((member) => member.userId);
    if (teamMembers.includes(userId)) return { error: "Already a member" };
    await prisma.teamMember.create({ data: { teamId, userId } });
    return { success: "Joined a team", teamPid: existingTeam.pid };
  } catch (error) {
    console.log("Join a team error: ", error);
    return { ...smthWentWrong };
  }
};

export const checkMembership = async (teamId: string) => {
  try {
    const userId = await getUserId();
    const isMember = await prisma.teamMember.findUnique({
      where: { userId_teamId: { teamId, userId } },
    });
    if (!isMember) return false;
    return true;
  } catch (error) {
    console.log("Check membership error: ", error);
    return false;
  }
};

export const leaveATeam = async (teamId: string) => {
  try {
    const userId = await getUserId();
    const deletedTeamMember = await prisma.teamMember.delete({
      where: { userId_teamId: { teamId, userId } },
    });
    if (!deletedTeamMember) return { error: "Team or user not found" };
    return { success: "Team left" };
  } catch (error) {
    console.log("Leave a team error: ", error);
    return { ...smthWentWrong };
  }
};

export const getTeamByPid = async (teamPid: string) => {
  try {
    const team = await prisma.team.findUniqueOrThrow({
      where: { pid: teamPid },
      include: includeData,
    });
    return team;
  } catch (error) {
    console.log("Get team by pid error: ", error);
    return null;
  }
};

export const getTeamWithMessagesByPid = async (teamPid: string) => {
  try {
    const team = await prisma.team.findUniqueOrThrow({
      where: { pid: teamPid },
      include: {
        TeamMessage: {
          include: { sender: true },
          where: { softDeleted: false },
        },
      },
    });
    return team;
  } catch (error) {
    console.log("Get team by pid error: ", error);
    return null;
  }
};

export const sendTeamMessage = async (teamPid: string, message: string) => {
  try {
    const userId = await getUserId();
    const team = await prisma.team.findUniqueOrThrow({
      where: { pid: teamPid },
      include: { members: true },
    });
    if (!team.members.some((member) => member.userId === userId))
      return { error: "Access denied" };
    const newMessage = await prisma.teamMessage.create({
      data: { message, senderId: userId, teamId: team.id },
      include: { sender: true },
    });
    return {
      data: {
        message,
        id: newMessage.id,
        senderId: newMessage.senderId,
        senderUsername: newMessage.sender.username,
      },
    };
  } catch (error) {
    console.log("Send team message error: ", error);
    return { ...smthWentWrong };
  }
};

export const deleteTeamMessage = async (messageId: string) => {
  try {
    const userId = await getUserId();
    const existingMessage = await prisma.teamMessage.update({
      where: { id: messageId, senderId: userId, softDeleted: false },
      data: { softDeleted: true },
    });
    if (!existingMessage)
      return {
        error: "Message not found, message already deleted or access denied",
      };
    return { success: "Message deleted" };
  } catch (error) {
    console.log("Delete team message error: ", error);
    return { ...smthWentWrong };
  }
};
