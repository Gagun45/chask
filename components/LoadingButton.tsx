import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";

const LoadingButton = ({ className }: { className?: string }) => {
  return (
    <Button className={`${className} pointer-events-none`}>
      <BeatLoader className="size-fit" color="oklch(0.8689 0.1231 89.37)" />
    </Button>
  );
};
export default LoadingButton;
