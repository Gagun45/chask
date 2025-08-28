import { Button } from "@/components/ui/button";
import { selectCurrentTeamId } from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import {
  addNewColumn,
  selectTeamTasksColumns,
  type TeamTaskColumn,
} from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import { store, type AppDispatch } from "@/redux/store";
import { generateIntPid } from "@/utils/actions/helper";
import { useDispatch, useSelector } from "react-redux";

const AddNewColumnBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTeamId = useSelector(selectCurrentTeamId);

  const onAddNewColumn = () => {
    const state = store.getState();
    const columns = selectTeamTasksColumns(state);
    const newColumn: TeamTaskColumn = {
      pid: generateIntPid(),
      teamId: currentTeamId,
      title: `Column ${columns.length + 1}`,
    };
    dispatch(addNewColumn({ ...newColumn }));
  };
  return <Button onClick={onAddNewColumn}>Add column</Button>;
};
export default AddNewColumnBtn;
