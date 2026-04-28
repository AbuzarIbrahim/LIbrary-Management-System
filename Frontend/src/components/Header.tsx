"use client"
import { usePathname } from "next/navigation"
import { LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import useAuth from "../hooks/queries/useAuth"
import { useState, useEffect } from "react"
export function Header() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [userName, setUserName] = useState("")
  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setUserName(user.name)
      } catch (e) {
        console.error(e)
      }
    }
  }, [])
  if (pathname === "/login" || pathname === "/register") return null
  return (
    <header className="fixed top-0 right-0 left-64 h-16 border-b bg-background/50 backdrop-blur-xl z-40 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-sm font-medium text-muted-foreground capitalize">
          {pathname === "/" ? "Dashboard" : pathname.split("/").filter(Boolean).pop()?.replace("-", " ")}
        </h2>
      </div>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <div className="h-8 w-px bg-border/50" />
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold leading-none">{userName || "User"}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Authorized</span>
          </div>
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center border border-border/50">
            <User className="w-5 h-5 text-accent-foreground" />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => logout.mutate()}
          className="text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  )
}
