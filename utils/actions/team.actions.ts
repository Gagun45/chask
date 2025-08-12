"use server";

import { safeParse } from "zod";
import type { newTeamFormData } from "../types";
import { newTeamFormSchema } from "../zod/zod-schemas";
import { smthWentWrong } from "@/config/helper";
import { prisma } from "@/prisma/prisma";
import { getUserId } from "./helper";
import type { Prisma } from "@prisma/client";

type TeamWithCreator = Prisma.TeamGetPayload<{ include: { creator: true } }>;

export const createNewTeam = async (values: newTeamFormData) => {
  try {
    const userId = await getUserId();

    const parsedData = safeParse(newTeamFormSchema, values);
    if (parsedData.error) return { error: "Invalid data" };
    const { name, description } = parsedData.data;
    await prisma.team.create({
      data: { name, description, creatorId: userId },
    });
    return { success: "Team created" };
  } catch (error) {
    console.log("Create new team error: ", error);
    return { ...smthWentWrong };
  }
};

export const getOwnTeams = async (): Promise<TeamWithCreator[]> => {
  try {
    const userId = await getUserId();
    const ownTeams = await prisma.team.findMany({
      where: { creatorId: userId },
      include: { creator: true },
    });
    return ownTeams;
  } catch (error) {
    console.log("Get own teams error: ", error);
    return [];
  }
};
