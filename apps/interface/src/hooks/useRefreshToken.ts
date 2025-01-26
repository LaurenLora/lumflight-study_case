"use client";

import axios from "@/plugins/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refresh", {
      refresh: session?.refreshToken
    });

    if (session) session.accessToken = res.data.accessToken;
    else signIn();
  };
  return refreshToken;
};
