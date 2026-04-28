"use server";
import axiosInstance from "../utils/axios";
import { User, ApiResponse, ActionResponse, SignupRequest } from "../types";
import { AuthData } from "../types";

export async function actionGetUsers(): Promise<ActionResponse<User[]>> {
  try {
    const res = await axiosInstance.get<ApiResponse<{ users?: User[] }>>(
      "/api/v1/users"
    );
    const users = res.data.data.users || (res.data.data as unknown as User[]);
    return {
      success: true,
      data: users,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}

export async function actionCreateUser(
  userData: SignupRequest
): Promise<ActionResponse<AuthData>> {
  try {
    const res = await axiosInstance.post<ApiResponse<AuthData>>(
      "/api/v1/users/signup",
      userData
    );
    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}
