import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  gotoLabel: string;
  gotoHref: string;
}

const AuthFormWrapper = ({ children, gotoHref, gotoLabel, title }: Props) => {
  return (
    <div className="p-4 mx-auto w-full items-center max-w-2xl flex flex-col bg-first">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
      <Link className="hover:underline underline-offset-2" href={gotoHref}>
        {gotoLabel}
      </Link>
    </div>
  );
};
export default AuthFormWrapper;
