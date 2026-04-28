"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
const tabs = [
  { name: "Add Book", href: "/maintenance/add-book" },
  { name: "Add Membership", href: "/maintenance/add-membership" },
  { name: "User Management", href: "/maintenance/user-management" },
]
export function MaintenanceTabs() {
  const pathname = usePathname()
  return (
    <div className="flex space-x-4 border-b mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "pb-2 px-1 text-sm font-medium transition-colors border-b-2",
            pathname === tab.href
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-primary"
          )}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  )
}
export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Maintenance</h1>
      <MaintenanceTabs />
      {children}
    </div>
  )
}
