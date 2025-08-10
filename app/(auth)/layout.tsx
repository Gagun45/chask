import type { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <span className="text-center font-bold text-4xl tracking-widest mb-6">AUTHENTICATION</span>
      {children}
    </main>
  );
};
export default layout;
