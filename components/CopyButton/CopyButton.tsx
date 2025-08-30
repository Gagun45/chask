"use client";

import { CopyIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  value: string;
}

const CopyButton = ({ value }: Props) => {
  const handleCopy = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    await navigator.clipboard.writeText(`${baseUrl}/teams/invite/${value}`);
  };
  return (
    <Button onClick={handleCopy}>
      <CopyIcon />
    </Button>
  );
};
export default CopyButton;
