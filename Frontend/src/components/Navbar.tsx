"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Book, Repeat, FileText, Settings, LogOut, Home } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "./ThemeToggle"
import useAuth from "../hooks/queries/useAuth"
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Books", href: "/books", icon: Book },
  { name: "Transactions", href: "/transactions/issue-book", icon: Repeat },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Maintenance", href: "/maintenance/add-book", icon: Settings },
]
export function Navbar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [userRole, setUserRole] = useState<string | null>(null)
  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setUserRole(user.role)
      } catch (e) {
        console.error("Failed to parse user from local storage", e)
      }
    }
  }, [pathname])
  if (pathname === "/login" || pathname === "/register") return null
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              LMS
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navItems.filter(item => {
                if (item.name === "Maintenance") {
                  return userRole === "admin"
                }
                return true
              }).map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-2 text-sm font-medium transition-colors py-2 px-1",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout.mutate()}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
