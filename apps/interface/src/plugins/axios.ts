import axios from "axios";
import { API_URL } from "@/lib/constants";
import { getSession } from "next-auth/react";

export const axiosPublic = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

export const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

axiosAuth.interceptors.request.use(
  async (config) => {
    let session = null;

    if (typeof window !== "undefined") {
      session = await getSession();
    }

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    if (!session && typeof window !== "undefined") {
      console.error("No session found. Redirecting to login...");
      window.location.href = "/login";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const session = await getSession();

      if (session?.refreshToken) {
        try {
          const refreshResponse = await axiosPublic.post("/auth/refresh", {
            refreshToken: session.refreshToken
          });

          const newAccessToken = refreshResponse.data.accessToken;

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosAuth(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);

          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosPublic;
