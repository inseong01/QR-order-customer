"use client";

import SimpleIcon from "../../../components/simple-icon/icon-index";
import { useBoundStore } from "@/lib/store/use-bound-store";
import { HeaderTitle } from "@/types/common";

import { useRouter } from "next/navigation";
import { memo } from "react";

function Header({ title }: { title: HeaderTitle }) {
  // store
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const tableName = useBoundStore((state) => state.tableState.tableName);
  // useRouter
  const router = useRouter();

  function navOnClickBack() {
    if (isSubmit) return;
    if (submitStatus === "fulfilled") {
      // 주문 페이지 돌아오기 방지
      router.replace(`/${tableName}`);
      return;
    }
    router.back();
  }

  return (
    <header
      className={"relative z-9 h-auto w-full cursor-default bg-[#f4f4f4]"}
    >
      <div className={"relative flex h-full w-full items-center p-4"}>
        <nav
          onClick={navOnClickBack}
          className={"h-4 w-4 cursor-pointer text-sm"}
        >
          <SimpleIcon type={"arrow-left"} />
        </nav>
        <span className={"absolute top-1/2 left-1/2 -translate-1/2 leading-5"}>
          {title}
        </span>
      </div>
    </header>
  );
}

export default memo(Header);
