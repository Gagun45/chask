"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import MyTeamsRedux from "./MyTeams/MyTeamsRedux";
import { PlusCircleIcon } from "lucide-react";

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="h-24 bg-first flex items-center justify-center">
        LOGO
      </SidebarHeader>
      <SidebarContent className="bg-blue-500 overflow-hidden">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton onClick={() => setOpenMobile(false)} asChild>
              <Link href={"/teams/create"}>Create a team</Link>
            </SidebarMenuButton>
            <SidebarMenuButton onClick={() => setOpenMobile(false)} asChild>
              <Link href={"/teams/own"}>Own teams</Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className="overflow-y-auto custom-scrollbar">
          <SidebarMenu className="items-center gap-2">
            <MyTeamsRedux />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-first h-24 justify-center">
        <Link
          href={`/teams/create`}
          onClick={() => setOpenMobile(false)}
          className="flex w-full h-16 px-4 items-center group gap-2 rounded-md"
        >
          <div className="flex items-center justify-center size-12 rounded-full shrink-0">
            <PlusCircleIcon className="size-4/5 group-hover:scale-120 duration-300" />
          </div>
          <span className="line-clamp-1 text-lg font-semibold">
            Create a team
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
