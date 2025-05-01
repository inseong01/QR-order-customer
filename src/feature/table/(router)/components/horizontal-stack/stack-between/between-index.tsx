import { ReactNode } from "react";

export default function RowSpaceBetween({
  children,
  tag,
}: {
  tag: "div" | "ul" | "li";
  children: ReactNode;
}) {
  switch (tag) {
    case "div": {
      return (
        <div className={`flex w-full items-center justify-between`}>
          {children}
        </div>
      );
    }
    case "li": {
      return (
        <li className={`flex w-full items-center justify-between`}>
          {children}
        </li>
      );
    }
  }
}
