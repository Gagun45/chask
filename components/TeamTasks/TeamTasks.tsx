import DNDContext from "./DNDContext/DNDContext";
import React, { useEffect, useState } from "react";
import AddNewColumnBtn from "./Column/AddNewColumnBtn";
import SaveChangesBtn from "./Column/SaveChangesBtn";

const TeamTasks = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className="flex flex-col h-full gap-2">
      <AddNewColumnBtn />
      <DNDContext />
      <SaveChangesBtn />
    </div>
  );
};
export default TeamTasks;
