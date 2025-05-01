import { ReactNode } from "react";

export default function RoutePageFrame({ children }: { children: ReactNode }) {
  return (
    <div className={"relative h-full w-full cursor-default overflow-hidden"}>
      {children}
    </div>
  );
}
