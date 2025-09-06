"use server";

import { prisma } from "@/prisma/prisma";
import {
  includeCreatorAndMembersCount,
  type TeamWithCreatorAndCountMembers,
} from "../types";
import type { Prisma } from "@prisma/client";
import { checkMembership } from "./team.actions";
import { getUserId } from "./helper";

type GetTeamByPidReturnType =
  | { error: string }
  | {
      team: Prisma.TeamGetPayload<{
        include: { creator: true; _count: { select: { members: true } } };
      }>;
    };

type GetTeamByInviteTokenReturnType =
  | { error: string }
  | {
      isMember: boolean;
      team: Prisma.TeamGetPayload<{
        include: { creator: true; _count: { select: { members: true } } };
      }>;
    };

type GetTeamWithMessagesByPidReturnType =
  | { error: string }
  | {
      data: {
        team: Prisma.TeamGetPayload<{
          include: {
            TeamMessage: {
              include: { sender: true };
              where: { softDeleted: false };
              orderBy: { createdAt: "desc" };
              take: 5;
            };
            TeamColumn: true;
            TeamTask: true;
          };
        }>;
        isMember: boolean;
        messagesLeft: number;
      };
    };

export const getTeamByPid = async (
  teamPid: string
): Promise<GetTeamByPidReturnType> => {
  try {
    const team = await prisma.team.findUnique({
      where: { pid: teamPid },
      include: includeCreatorAndMembersCount,
    });
    if (!team) return { error: "Team not found" };
    return { team };
  } catch (error) {
    console.log("Get team by pid error: ", error);
    return { error: "Something went wrong" };
  }
};

export const getTeamByInviteToken = async (
  token: string
): Promise<GetTeamByInviteTokenReturnType> => {
  try {
    const team = await prisma.team.findUnique({
      where: { inviteToken: token },
      include: { creator: true, _count: { select: { members: true } } },
    });
    if (!team) return { error: "Team not found" };
    const isMember = await checkMembership(team.id);
    return { team, isMember };
  } catch (error) {
    console.log("Get team by invite token error: ", error);
    return { error: "Something went wrong" };
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

export const getTeamWithMessagesByPid = async (
  teamPid: string
): Promise<GetTeamWithMessagesByPidReturnType> => {
  try {
    const userId = await getUserId();
    const team = await prisma.team.findUnique({
      where: { pid: teamPid, members: { some: { userId } } },
      include: {
        TeamMessage: {
          include: { sender: true },
          where: { softDeleted: false },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        TeamColumn: true,
        TeamTask: true,
      },
    });
    if (!team) return { error: "Team not found" };
    const isMember = await checkMembership(team.id);
    const messagesLeft = await prisma.teamMessage.count({
      where: { teamId: team.id, softDeleted: false },
    });
    return {
      data: {
        team,
        messagesLeft: messagesLeft - team.TeamMessage.length,
        isMember,
      },
    };
  } catch (error) {
    console.log("Get team by pid error: ", error);
    return { error: "Something went wrong" };
  }
};
