import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

const UserMenu = () => {
  const { data } = useSession();
  const user = data?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image as string} />
          <AvatarFallback className="bg-second font-bold text-2xl">
            {user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-second" side="bottom" align="center">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Button
            variant={"destructive"}
            onClick={() => signOut({ redirect: false })}
            className="mx-auto"
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserMenu;
