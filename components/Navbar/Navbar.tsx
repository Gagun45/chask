import Auth from "./Auth";
import { SidebarTrigger } from "../ui/sidebar";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="grid grid-cols-3 items-center ">
      <SidebarTrigger />
      <Logo />
      <div className="w-fit ml-auto">
        <Auth />
      </div>
    </header>
  );
};
export default Navbar;
