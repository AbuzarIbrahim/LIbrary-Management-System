"use client"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import PageWrapper from "@/components/PageWrapper"
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/register"
  if (isAuthPage) {
    return <PageWrapper>{children}</PageWrapper>
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 pl-64 pt-16">
          <div className="container mx-auto p-8">
            <PageWrapper>
              {children}
            </PageWrapper>
          </div>
        </main>
      </div>
    </div>
  )
}
