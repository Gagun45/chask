import type { Prisma } from "@prisma/client";

interface Props {
  team: Prisma.TeamGetPayload<{ include: { creator: true } }>;
}

const TeamCard = ({ team }: Props) => {
  return (
    <div className="flex flex-col">
      <span>{team.name}</span>
      <span>{team.creator.name}</span>
    </div>
  );
};
export default TeamCard;
