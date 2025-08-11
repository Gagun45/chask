"use server";

import type { registerFormData } from "../types";
import { safeParse } from "zod";
import { registerFormSchema } from "../zod/zod-schemas";
import { prisma } from "@/prisma/prisma";
import { hashSync } from "bcryptjs";
import { smthWentWrong } from "@/config/helper";

export const register = async (data: registerFormData) => {
  try {
    const parsedData = safeParse(registerFormSchema, data);
    if (parsedData.error) return { error: "Wrong data" };
    const { email, password, name } = parsedData.data;
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) return { error: "Email already taken" };
    const hashedPass = hashSync(password);
    await prisma.user.create({ data: { email, password: hashedPass, name } });
    return { success: "User created" };
  } catch (error) {
    console.log("Register error: ", error);
    return { ...smthWentWrong };
  }
};
