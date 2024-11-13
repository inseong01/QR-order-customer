'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { useEffect } from "react";
import { changeUser } from "@/lib/features/userState/userSlice";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => { router.push('/visitor'); }, [router]);

  return <div>this is login UI</div>
}
