import TeamCard from "@/components/TeamCard/TeamCard";
import { getMyTeams } from "@/utils/actions/team.get.actions";

const MyTeams = async () => {
  const myTeams = await getMyTeams();

  return (
    <div className="flex flex-col">
      <span>My Teams</span>
      {myTeams.length > 0 &&
        myTeams.map((team) => (
          <TeamCard key={team.id} team={team} isMember={true} />
        ))}
    </div>
  );
};
export default MyTeams;
