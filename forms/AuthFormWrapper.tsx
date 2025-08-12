import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  gotoLabel?: string;
  gotoHref?: string;
}

const AuthFormWrapper = ({ children, gotoHref, gotoLabel, title }: Props) => {
  return (
    <div className="pt-8 py-2 rounded-md px-4 mx-auto w-full items-center max-w-2xl flex flex-col bg-first">
      <h2 className="text-3xl font-semibold mb-8">{title}</h2>
      {children}
      {gotoHref && gotoLabel && (
        <Link
          className="hover:underline text-gray-700 mt-8 underline-offset-2"
          href={gotoHref}
        >
          {gotoLabel}
        </Link>
      )}
    </div>
  );
};
export default AuthFormWrapper;
