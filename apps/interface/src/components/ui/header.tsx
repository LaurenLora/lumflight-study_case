import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button
} from "@heroui/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const Header = () => {
  const { status } = useSession();
  const router = useRouter();

  return (
    <Navbar
      maxWidth="full"
      className=" bg-white border-none"
      classNames={{
        base: "border-none",
        wrapper: "p-0 px-5"
      }}>
      <NavbarContent>
        <NavbarBrand>
          <Button
            disableRipple
            onPress={() => router.push("/")}
            startContent={<AcmeLogo />}
            className="bg-transparent justify-start p-0">
            <p className="font-bold text-inherit">LuminFLY</p>
          </Button>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            disableRipple
            size="sm"
            onPress={() => {
              if (status === "authenticated") {
                signOut({ callbackUrl: "/" });
              } else {
                router.push("/login");
              }
            }}
            className="bg-transparent font-semibold text-md">
            {status === "authenticated" ? "LogOut" : "LogIn"}
          </Button>
        </NavbarItem>
        {status === "authenticated" && (
          <NavbarItem>
            <Button
              disableRipple
              size="sm"
              onPress={() => router.push("/app")}
              className="bg-transparent font-semibold text-md">
              App
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};
export default Header;
