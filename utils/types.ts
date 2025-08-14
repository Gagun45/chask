import type z from "zod";
import type {
  loginFormSchema,
  newTeamFormSchema,
  registerFormSchema,
} from "./zod/zod-schemas";
import type { Prisma } from "@prisma/client";

export type registerFormData = z.infer<typeof registerFormSchema>;
export type loginFormData = z.infer<typeof loginFormSchema>;
export type newTeamFormData = z.infer<typeof newTeamFormSchema>;

export type StatusType = "idle" | "loading" | "succeeded" | "failed";

export type teamWithMessages = Prisma.TeamGetPayload<{
  include: { TeamMessage: { include: { sender: true } } };
}>;

export type TeamMessageWithSender = Prisma.TeamMessageGetPayload<{
  include: { sender: true };
}>;

export type TeamWithCreatorAndCountMembers = Prisma.TeamGetPayload<{
  include: { creator: true; _count: { select: { members: true } } };
}>;

export const includeData = {
  creator: true,
  _count: { select: { members: true } },
};
