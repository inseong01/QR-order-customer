import { menu_child } from "@/lib/motion/display-menu/menu-variants";
import { useBoundStore } from "@/lib/store/use-bound-store";
import { MenuList, TagDescription } from "@/types/common";
import MenuAddIcon from "./menu-add";

import { motion } from "motion/react";
import { memo } from "react";
import Image from "next/image";

function Item({ list }: { list: MenuList }) {
  // store
  const clickMenu = useBoundStore((state) => state.clickMenu);
  // variant
  const { name, price, tag } = list;
  const priceToString = price.toLocaleString();

  let tagDescription: TagDescription = "";
  switch (tag) {
    case "popular": {
      tagDescription = "인기";
      break;
    }
    case "new": {
      tagDescription = "신규";
      break;
    }
    case "soldout": {
      tagDescription = "품절";
      break;
    }
  }

  function onClickMenuClick() {
    if (tag === "soldout") return;
    clickMenu(list);
  }

  return (
    <motion.li
      className={`flex w-full gap-2.5 px-4 py-2`}
      onClick={onClickMenuClick}
      variants={menu_child}
      data-tag={tag}
    >
      <ItemImage list={list} tagDescription={tagDescription} />
      <ItemInfo list={list} title={name} price={priceToString} />
    </motion.li>
  );
}

export default memo(Item);

function ItemInfo({
  title,
  price,
  list,
}: {
  title: string;
  price: string;
  list: MenuList;
}) {
  return (
    <div
      className={
        "flex max-h-[60px] flex-1 cursor-pointer flex-col justify-between"
      }
    >
      <div className={"flex flex-col gap-0.5 text-sm"}>
        <span>{title}</span>
        <span>{price}원</span>
      </div>
      <MenuAddIcon list={list} />
    </div>
  );
}

function ItemImage({
  list,
  tagDescription,
}: {
  list: MenuList;
  tagDescription: TagDescription;
}) {
  const { name, tag, url } = list;

  return (
    <div
      className={
        "relative h-16 w-24 cursor-pointer overflow-hidden rounded border-[1px] border-[#e7e7e7] bg-[#989898]"
      }
    >
      <div
        className={
          "absolute flex h-4 w-8 items-center justify-center rounded-br-lg"
        }
      >
        <span className={"text-xs text-white"}>{tagDescription}</span>
      </div>
      <Image
        src={`https://onofrsiptqngmwfzenlr.supabase.co/storage/v1/object/public/qr-order-img/${url}`}
        alt={name}
        width={100}
        height={60}
        placeholder="blur"
        blurDataURL={`https://onofrsiptqngmwfzenlr.supabase.co/storage/v1/object/public/qr-order-img/${url}`}
        style={{
          objectFit: "cover",
          filter: tag === "soldout" ? "opacity(0.5)" : "opacity(1)",
        }}
      />
    </div>
  );
}
