"use client";

import { getOwnTeams } from "@/utils/actions/team.actions";
import type { TeamWithCreatorAndCountMembers } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import TeamCard from "../TeamCard/TeamCard";
import { FadeLoader } from "react-spinners";

const OwnTeams = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ownTeams, setOwnTeams] = useState<TeamWithCreatorAndCountMembers[]>(
    []
  );
  const fetchOwnTeams = useCallback(async () => {
    const teams = await getOwnTeams();
    setOwnTeams(teams);
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchOwnTeams();
  }, [fetchOwnTeams]);
  if (isLoading) return <FadeLoader />;
  return (
    <div>
      {ownTeams.length > 0 &&
        ownTeams.map((team) => <TeamCard key={team.id} team={team} />)}
    </div>
  );
};
export default OwnTeams;
