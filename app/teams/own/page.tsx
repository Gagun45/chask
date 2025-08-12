import TeamCard from "@/components/TeamCard/TeamCard";
import { getOwnTeams } from "@/utils/actions/team.actions";

const OwnTeams = async () => {
  const ownTeams = await getOwnTeams();
  return (
    <div className="flex flex-col">
      <span>Own Teams</span>
      {ownTeams.length > 0 &&
        ownTeams.map((team) => <TeamCard key={team.id} team={team} />)}
    </div>
  );
};
export default OwnTeams;
