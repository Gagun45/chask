"use client";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const LoginProviderButtons = () => {
  return (
    <div className="flex flex-col max-w-md w-full gap-4">
      <span className="text-center">or</span>
      <div className="flex w-full gap-4">
        <Button
          variant={"secondary"}
          onClick={() => signIn("google")}
          className="grow"
        >
          Login via Google
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => signIn("github")}
          className="grow"
        >
          Login via Github
        </Button>
      </div>
    </div>
  );
};
export default LoginProviderButtons;
