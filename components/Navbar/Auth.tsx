"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

const Auth = () => {
  const { status } = useSession();

  if (status === "loading") return <></>;
  if (status === "unauthenticated")
    return (
      <Link className={buttonVariants({ variant: "custom" })} href={"/login"}>
        Login
      </Link>
    );

  return <Button onClick={() => signOut()}>Logout</Button>;
};
export default Auth;
