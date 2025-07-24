import type { FC, ReactNode } from "react";

export const Container: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="w-full mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-5">
    {children}
  </div>
);
