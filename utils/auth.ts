import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ profile }) {
      await prisma.user.update({
        where: { email: profile.email!, emailVerified: null },
        data: { emailVerified: new Date() },
      });
    },
  },
  ...authConfig,
});
