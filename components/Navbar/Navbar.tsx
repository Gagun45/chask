import Link from "next/link";

const Navbar = () => {
  return (
    <header className="justify-between items-center ">
      <span>Logo</span>
      <div className="flex items-center gap-2">
        <Link href={"/login"}>Login</Link>
      </div>
    </header>
  );
};
export default Navbar;
