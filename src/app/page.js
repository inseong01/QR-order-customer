'use client'

import styles from "./page.module.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => { router.push('/visitor'); }, [router]);

  return <div>this is login UI</div>
}
