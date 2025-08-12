import type { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <span className="text-center font-bold text-4xl tracking-widest mb-4 py-2 md:py-8">
        TEAMS MANAGEMENT
      </span>
      {children}
    </main>
  );
};
export default layout;
