"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { actionLogin, actionLogout, actionSignup } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { AuthData, ApiResponse } from "@/types";

export default function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: actionLogin,
    onSuccess: (res: { success: boolean; data?: ApiResponse<AuthData>; message?: string }) => {
      if (res.success && res.data) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(res.message || "Login failed");
      }
    },
  });

  const signup = useMutation({
    mutationKey: ["signup"],
    mutationFn: actionSignup,
    onSuccess: (res: { success: boolean; data?: ApiResponse<AuthData>; message?: string }) => {
      if (res.success && res.data) {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success("Registration successful!");
        router.push("/");
      } else {
        toast.error(res.message || "Registration failed");
      }
    },
  });

  const logout = useMutation({
    mutationKey: ["logout"],
    mutationFn: actionLogout,
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    },
  });

  return {
    login,
    signup,
    logout,
  };
}
