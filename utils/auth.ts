import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";
import authConfig from "./auth.config";
import { v4 as uuid } from "uuid";
import { hashSync } from "bcryptjs";
import type { Prisma } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      if (typeof token.username === "string")
        session.user.username = token.username;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
  },
  events: {
    async createUser({ user }) {
      const hashedPassword = hashSync(uuid().slice(0, 16));
      await prisma.user.update({
        where: { email: user.email! },
        data: {
          password: hashedPassword,
        },
      });
    },
    async linkAccount({ profile }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email! },
      });

      if (!existingUser) return;

      const updateData: Prisma.UserUpdateInput = {};

      if (!existingUser?.emailVerified) {
        updateData.emailVerified = new Date();
      }
      if (!existingUser.image && profile.image) {
        updateData.image = profile.image;
      }
      if (!existingUser.name && profile.name) {
        updateData.name = profile.name;
      }

      if (existingUser.username === "Unknown") {
        updateData.username = profile.email?.split("@")[0];
      }

      await prisma.user.update({
        where: { email: profile.email! },
        data: updateData,
      });
    },
  },
  ...authConfig,
});
