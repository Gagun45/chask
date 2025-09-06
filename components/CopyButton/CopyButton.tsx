"use client";

import { CopyIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  value: string;
}

const CopyButton = ({ value }: Props) => {
  const [allowedToCopy, setAllowedToCopy] = useState(true);
  const handleCopy = async () => {
    if (!allowedToCopy) return;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    await navigator.clipboard.writeText(`${baseUrl}/teams/invite/${value}`);
    setAllowedToCopy(false);
    const copyDelayTimeout = setTimeout(() => {
      setAllowedToCopy(true);
    }, 1000);
    toast.info("Copied to clipboard!");
    return () => clearTimeout(copyDelayTimeout);
  };
  return (
    <Button onClick={handleCopy}>
      <CopyIcon />
    </Button>
  );
};
export default CopyButton;
