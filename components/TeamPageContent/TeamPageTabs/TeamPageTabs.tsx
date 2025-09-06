"use client";

import type { teamWithMessages } from "@/utils/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import TeamChat from "./TeamChat/TeamChat";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { setInitialMessages } from "@/redux/features/currentTeamMessages/currentTeamMessagesSlice";
import { formatMessages } from "@/utils/actions/helper";
import TeamTasks from "./TeamTasks/TeamTasks";
import { setInitialTasks } from "@/redux/features/currentTeamTasks/currentTeamTasksSlice";
import CopyButton from "@/components/CopyButton/CopyButton";

interface Props {
  team: teamWithMessages;
  messagesLeft: number;
}

const TeamPageTabs = ({ messagesLeft, team }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const formattedMessages = formatMessages(team.TeamMessage);
    dispatch(
      setInitialMessages({
        messages: formattedMessages,
        messagesLeft,
        teamId: team.id,
      })
    );
    dispatch(
      setInitialTasks({
        columns: [...team.TeamColumn].sort(
          (a, b) => a.orderNumber - b.orderNumber
        ),
        tasks: [...team.TeamTask].sort((a, b) => a.orderNumber - b.orderNumber),
      })
    );
  }, [team, messagesLeft, dispatch]);
  return (
    <Tabs defaultValue="chat" className="w-9/10">
      <div className="flex relative">
        <TabsList className="mx-auto gap-8 bg-first">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <CopyButton value={team.inviteToken} />
      </div>
      <TabsContent value="chat" className="teamPageTabsContent">
        <TeamChat />
      </TabsContent>
      <TabsContent value="tasks" className="teamPageTabsContent">
        <TeamTasks />
      </TabsContent>
    </Tabs>
  );
};
export default TeamPageTabs;
