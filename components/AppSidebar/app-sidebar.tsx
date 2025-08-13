"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import MyTeamsRedux from "./MyTeams/MyTeamsRedux";

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
              <Link href={"/teams/all"}>All teams</Link>
            </SidebarMenuButton>
            <SidebarMenuButton onClick={() => setOpenMobile(false)} asChild>
              <Link href={"/teams/my"}>My teams</Link>
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
      <SidebarFooter className="bg-first h-24">FOOTER</SidebarFooter>
    </Sidebar>
  );
}
