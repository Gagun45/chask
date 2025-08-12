import { getOwnTeams } from "@/utils/actions/team.actions";

const OwnTeams = async () => {
  const ownTeams = await getOwnTeams();
  return (
    <div className="flex flex-col">
      <span>Own Teams</span>
      {ownTeams.length > 0 &&
        ownTeams.map((team) => (
          <div key={team.id} className="border-2 p-4 flex flex-col">
            <span>Name: {team.name}</span>
            <span>Creator: {team.creator.name}</span>
          </div>
        ))}
    </div>
  );
};
export default OwnTeams;
