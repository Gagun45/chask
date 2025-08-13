import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import type { Team } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  team: Team;
}

const MyTeamLink = ({ team }: Props) => {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuButton onClick={() => setOpenMobile(false)} asChild>
      <Link
        key={team.id}
        href={`/teams/team/${team.pid}`}
        className="flex w-full h-16 px-4 items-center gap-2 rounded-md"
      >
        <div className="relative size-12 rounded-full overflow-hidden shrink-0">
          <Image src={"https://github.com/shadcn.png"} alt="Team Logo" fill />
        </div>
        <span className="line-clamp-1">{team.name}</span>
      </Link>
    </SidebarMenuButton>
  );
};
export default MyTeamLink;
