"use server";
import axiosInstance from "../utils/axios";
import { AuthData, ApiResponse } from "../types";
import { cookies } from "next/headers";

export async function actionLogin(credentials: any): Promise<{ success: boolean; data?: ApiResponse<AuthData>; message?: string }> {
  try {
    const res = await axiosInstance.post<ApiResponse<AuthData>>("/api/v1/users/login", credentials);
    const { token, user } = res.data.data;
    const cookieStore = await cookies();
    cookieStore.set("token", token, { httpOnly: false });
    cookieStore.set("user", JSON.stringify(user), { httpOnly: false });
    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
}

export async function actionSignup(userData: any): Promise<{ success: boolean; data?: ApiResponse<AuthData>; message?: string }> {
  try {
    const res = await axiosInstance.post<ApiResponse<AuthData>>("/api/v1/users/signup", userData);
    const { token, user } = res.data.data;
    const cookieStore = await cookies();
    cookieStore.set("token", token, { httpOnly: false });
    cookieStore.set("user", JSON.stringify(user), { httpOnly: false });
    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    };
  }
}
export async function actionLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
  return { success: true };
}
