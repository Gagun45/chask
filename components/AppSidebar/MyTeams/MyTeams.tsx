import { getMyTeams } from "@/utils/actions/team.actions";
import type { TeamWithCreatorAndCountMembers } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyTeams = () => {
  const [myTeams, setMyTeams] = useState<TeamWithCreatorAndCountMembers[]>([]);
  const fetchMyTeams = async () => {
    const teams = await getMyTeams();
    setMyTeams(teams);
  };
  useEffect(() => {
    fetchMyTeams();
  }, []);
  return (
    <div className="flex flex-col">
      {myTeams.map((team) => (
        <Link
          key={team.id}
          href={`/teams/team/${team.name.replaceAll(" ", "")}`}
        >
          {team.name}
        </Link>
      ))}
    </div>
  );
};
export default MyTeams;
