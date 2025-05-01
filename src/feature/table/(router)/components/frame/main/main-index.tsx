import { ReactNode } from "react";

export default function MainTagFrame({ children }: { children: ReactNode }) {
  return (
    <main className={"flex h-lvh w-full flex-col gap-5 overflow-y-auto p-4"}>
      {children}
    </main>
  );
}
