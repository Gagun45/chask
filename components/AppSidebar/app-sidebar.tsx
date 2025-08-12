'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="h-24 bg-first flex items-center justify-center">
        LOGO
      </SidebarHeader>
      <SidebarContent className="bg-blue-500">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton onClick={() => setOpenMobile(false)}>
              <Link href={"/teams/create"}>Create a team</Link>
            </SidebarMenuButton>
            <SidebarMenuButton onClick={() => setOpenMobile(false)}>
              <Link href={"/teams/all"}>All teams</Link>
            </SidebarMenuButton>
            <SidebarMenuButton onClick={() => setOpenMobile(false)}>
              <Link href={"/teams/my"}>My teams</Link>
            </SidebarMenuButton>
            <SidebarMenuButton onClick={() => setOpenMobile(false)}>
              <Link href={"/teams/own"}>Own teams</Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-first h-24">FOOTER</SidebarFooter>
    </Sidebar>
  );
}
