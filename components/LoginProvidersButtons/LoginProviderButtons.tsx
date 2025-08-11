"use client";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const LoginProviderButtons = () => {
  return (
    <div className="flex flex-col max-w-md w-full gap-4">
      <span className="text-center">or</span>
      <div className="flex flex-col sm:flex-row w-full gap-4">
        <Button
          type="button"
          variant={"secondary"}
          onClick={() => signIn("google")}
          className="grow"
        >
          Continue with Google
        </Button>
        <Button
          type="button"
          variant={"secondary"}
          onClick={() => signIn("github")}
          className="grow"
        >
          Continue with Github
        </Button>
      </div>
    </div>
  );
};
export default LoginProviderButtons;
