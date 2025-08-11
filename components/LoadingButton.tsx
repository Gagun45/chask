import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";

const LoadingButton = ({ className }: { className?: string }) => {
  return (
    <Button className={`${className} pointer-events-none`}>
      <BeatLoader />
    </Button>
  );
};
export default LoadingButton;
