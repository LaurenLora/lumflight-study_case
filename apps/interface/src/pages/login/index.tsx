import LoadingModal from "@/components/modals/LoadingModal";
import { TCredentials } from "@/types";
import { Button, Input } from "@heroui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const [credentials, setCredentials] = useState<
    TCredentials | { email: string; password: string }
  >({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: ""
    }));
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password
      });

      if (res?.error) {
        setErrors((prev) => ({
          ...prev,
          general: "Invalid email or password"
        }));
      } else {
        router.push("/app");
      }
    } catch (error) {
      console.log(error);
      setErrors((prev) => ({
        ...prev,
        general: "An unexpected error occurred. Please try again."
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/app");
    }
  }, [status, router]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await handleLogin();
    }
  };

  return (
    <>
      <LoadingModal isOpen={loading} />
      <div className="flex items-center justify-center min-h-[90vh] bg-gray-100 ">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
          <h1 className="text-xl font-semibold mb-4 text-center">LumFlight</h1>
          <div className="flex flex-col gap-5 h-auto mx-auto">
            <Input
              name="email"
              onChange={handleInputChange}
              value={credentials.email}
              onKeyDown={handleKeyDown}
              placeholder="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <Input
              name="password"
              onChange={handleInputChange}
              value={credentials.password}
              placeholder="password"
              onKeyDown={handleKeyDown}
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            {errors.general && (
              <p className="text-red-500 text-sm text-center">
                {errors.general}
              </p>
            )}
            <Button onPress={handleLogin}>Sign In</Button>
          </div>
        </div>
      </div>
    </>
  );
}
