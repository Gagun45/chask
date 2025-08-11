"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu/UserMenu";

const Auth = () => {
  const { status } = useSession();

  if (status === "loading") return <></>;
  if (status === "unauthenticated")
    return (
      <Link className={buttonVariants({ variant: "custom" })} href={"/login"}>
        Login
      </Link>
    );

  return <UserMenu />;
};
export default Auth;
