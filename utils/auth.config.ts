import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { loginFormSchema } from "./zod/zod-schemas";
import { prisma } from "@/prisma/prisma";

export default {
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("authorizsadasdas", credentials);
        const parsedData = loginFormSchema.safeParse(credentials);
        if (parsedData.error) return null;
        const { email, password } = parsedData.data;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser || !existingUser.password) return null;
        const passwordMatch = compare(password, existingUser.password);
        if (!passwordMatch) return null;
        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
