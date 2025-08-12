import { prisma } from "@/prisma/prisma";

const AllTeams = async () => {
  const allTeams = await prisma.team.findMany({ include: { creator: true } });
  return (
    <div className="flex flex-col">
      <span>AllTeams</span>
      {allTeams.length > 0 &&
        allTeams.map((team) => (
          <div key={team.id} className="border-2 p-4 flex flex-col">
            <span>Name: {team.name}</span>
            <span>Creator: {team.creator.name}</span>
          </div>
        ))}
    </div>
  );
};
export default AllTeams;
