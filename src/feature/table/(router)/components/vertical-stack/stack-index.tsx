import { ReactNode } from "react";

export default function VerticalStackGroup({
  children,
  tag,
  gap,
}: {
  tag: "div" | "ul" | "li";
  gap: "gap-5" | "gap-2.5";
  children: ReactNode;
}) {
  switch (tag) {
    case "div": {
      return (
        <div className={`flex h-auto w-full flex-col ${gap}`}>{children}</div>
      );
    }
    case "ul": {
      return (
        <ul className={`flex h-auto w-full flex-col ${gap}`}>{children}</ul>
      );
    }
    case "li": {
      return (
        <li className={`flex h-auto w-full flex-col ${gap}`}>{children}</li>
      );
    }
  }
}
