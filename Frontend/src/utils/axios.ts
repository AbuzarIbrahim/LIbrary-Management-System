import axios from "axios"
import { cookies } from "next/headers"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    let token: string | null = null

    if (typeof window !== "undefined") {
      token = localStorage.getItem("token")
    } else {
      try {
        const cookieStore = await cookies()
        token = cookieStore.get("token")?.value || null
      } catch (e) {
      }
    }

    if (token) {
      console.log(`Token found (${typeof window !== "undefined" ? "Client" : "Server"})`);
      config.headers.Authorization = `Bearer ${token}`
    } else {
      console.log(`No token found (${typeof window !== "undefined" ? "Client" : "Server"})`);
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
