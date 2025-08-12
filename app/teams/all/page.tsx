import TeamCard from "@/components/TeamCard/TeamCard";
import { prisma } from "@/prisma/prisma";
import { getUserId } from "@/utils/actions/helper";

const AllTeams = async () => {
  const userId = await getUserId();
  const allTeams = await prisma.team.findMany({
    include: {
      creator: true,
      members: true,
      _count: { select: { members: true } },
    },
  });
  const payload = allTeams.map((team) => {
    const isMember = team.members.some((member) => member.userId === userId);
    return { team, isMember };
  });
  return (
    <div className="flex flex-col">
      <span>All Teams</span>
      {payload.length > 0 &&
        payload.map((item) => (
          <TeamCard
            key={item.team.id}
            team={item.team}
            isMember={item.isMember}
          />
        ))}
    </div>
  );
};
export default AllTeams;
