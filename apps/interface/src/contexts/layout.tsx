/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { useMounted } from "@/hooks/useMounted";
import Header from "@/components/ui/header";
import Loader from "@/components/ui/loader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <>
      <HeroUIProvider>
        <Header />
        <Loader />
        <main className="scrollbar-hide ">{children}</main>
      </HeroUIProvider>
    </>
  );
}
