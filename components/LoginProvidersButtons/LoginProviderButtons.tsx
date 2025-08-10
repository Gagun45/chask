import { Button } from "../ui/button";

const LoginProviderButtons = () => {
  return (
    <div className="flex flex-col max-w-md w-full gap-4">
      <span className="text-center">or</span>
      <div className="flex w-full gap-4">
        <Button variant={"secondary"} className="grow">
          Login via Google
        </Button>
        <Button variant={"secondary"} className="grow">
          Login via Github
        </Button>
      </div>
    </div>
  );
};
export default LoginProviderButtons;
