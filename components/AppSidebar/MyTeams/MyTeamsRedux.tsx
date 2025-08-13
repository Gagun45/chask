import { useSelector } from "react-redux";
import { selectMyTeamsAll } from "@/redux/features/myTeams/myTeamsSlice";
import MyTeamLink from "./MyTeamLink/MyTeamLink";

const MyTeamsRedux = () => {
  const myTeams = useSelector(selectMyTeamsAll);

  return (
    <>
      {myTeams.map((team) => (
        <MyTeamLink key={team.id} team={team}/>
      ))}
    </>
  );
};
export default MyTeamsRedux;
