import Link from "next/link";
import { useSelector } from "react-redux";
import {
  selectMyTeamsAll,
  selectMyTeamsStatus,
} from "@/redux/features/myTeams/myTeamsSlice";

const MyTeamsRedux = () => {
  const myTeams = useSelector(selectMyTeamsAll);
  const myTeamsStatus = useSelector(selectMyTeamsStatus);

  return (
    <div className="flex flex-col">
      <span>Status: {myTeamsStatus}</span>
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
export default MyTeamsRedux;
