import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="h-24 bg-first flex items-center justify-center">
        LOGO
      </SidebarHeader>
      <SidebarContent className="bg-blue-500">
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-first h-24">FOOTER</SidebarFooter>
    </Sidebar>
  );
}
