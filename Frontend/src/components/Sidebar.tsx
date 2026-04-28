"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Book, Repeat, FileText, Settings, Home, Library } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Books", href: "/books", icon: Book },
  { name: "Transactions", href: "/transactions/issue-book", icon: Repeat },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Maintenance", href: "/maintenance/add-book", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
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
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-card/50 backdrop-blur-xl z-50">
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Library className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight font-serif">LMS Portal</span>
        </div>

        <nav className="flex-1 space-y-2">
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
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "group-hover:scale-110 transition-transform")} />
                <span className="font-medium text-sm">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute right-2 w-1.5 h-1.5 bg-primary-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="pt-6 border-t border-border/50">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold px-4 mb-4">
            System
          </p>
        </div>
      </div>
    </aside>
  )
}
