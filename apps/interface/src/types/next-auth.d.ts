import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    email?: string;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    email?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    email?: string;
  }
}