import Link from "next/link";
import Auth from "./Auth";

const Navbar = () => {
  return (
    <header className="justify-between items-center ">
      <Link href={"/"}>Logo</Link>
      <Link href={"/protected"}>Protected</Link>
      <Auth />
    </header>
  );
};
export default Navbar;
