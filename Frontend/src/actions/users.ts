"use server";
import axiosInstance from "../utils/axios";
export async function actionGetUsers() {
  try {
    const res = await axiosInstance.get("/api/v1/users");
    const users = res.data.data.users || res.data.data;
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
export async function actionCreateUser(userData: any) {
  try {
    const res = await axiosInstance.post("/api/v1/users/signup", userData);
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
