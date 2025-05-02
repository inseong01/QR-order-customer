"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";
import { LoadingType } from "@/types/common";

export default function Loading({ type }: { type: LoadingType }) {
  const isClicked = useBoundStore((state) => state.flagState.isClicked);

  switch (type) {
    // 링크 이동 투명 배경
    case "link": {
      return (
        <>
          {isClicked && (
            <div className={`fixed z-9999 h-full w-full bg-white/30`}>
              <div className={"absolute top-1/2 left-1/2 -translate-1/2"}>
                <div className={"loader"}></div>
              </div>
            </div>
          )}
        </>
      );
    }
    // 이외 로딩은 x
    default: {
      return;
    }
  }
}
