"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Book, Repeat, FileText, Settings, ArrowRight, Library, Users, Clock } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import useBooks from "@/hooks/queries/useBooks"
import useMembers from "@/hooks/queries/useMembers"
import useTransactions from "@/hooks/queries/useTransactions"

export default function Home() {
  const [userName, setUserName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const { getBooks } = useBooks()
  const { getMembers } = useMembers()
  const { getTransactions } = useTransactions()

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setUserName(user.name)
        setIsAdmin(user.role === "admin")
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const bookCount = getBooks.data?.length || 0
  const memberCount = getMembers.data?.length || 0
  const pendingReturns = getTransactions.data?.filter((t: any) => !t.returnDate).length || 0
  // const totalTransactions = getTransactions.data?.length || 0
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="py-12 space-y-12">
      <section className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight font-serif text-foreground">
            Welcome back, <span className="text-primary">{userName || "Guest"}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mt-2">
            Your centralized hub for managing library operations, tracking memberships, and processing book transactions.
          </p>
        </motion.div>
      </section>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={item}>
          <Card className="bg-primary/5 border-primary/20 shadow-sm relative overflow-hidden group">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary font-medium flex items-center gap-2">
                <Library className="w-4 h-4" /> Total Collection
              </CardDescription>
              <CardTitle className="text-3xl font-bold">
                {getBooks.isLoading ? "..." : bookCount.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Books and Movies cataloged</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="bg-accent/5 border-accent/20 shadow-sm relative overflow-hidden group">
            <CardHeader className="pb-2">
              <CardDescription className="text-accent font-medium flex items-center gap-2">
                <Users className="w-4 h-4" /> Active Members
              </CardDescription>
              <CardTitle className="text-3xl font-bold">
                {getMembers.isLoading ? "..." : memberCount.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Registered and verified members</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="bg-foreground/5 border-foreground/10 shadow-sm relative overflow-hidden group">
            <CardHeader className="pb-2">
              <CardDescription className="text-foreground font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" /> Pending Returns
              </CardDescription>
              <CardTitle className="text-3xl font-bold">
                {getTransactions.isLoading ? "..." : pendingReturns.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Due for return</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-serif">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard 
            title="Browse Catalog" 
            desc="Explore the full collection of books and movies." 
            icon={Book} 
            href="/books"
            color="bg-blue-500"
          />
          <ActionCard 
            title="Issue Book" 
            desc="Register a new checkout for a member." 
            icon={Repeat} 
            href="/transactions/issue-book"
            color="bg-purple-500"
          />
          <ActionCard 
            title="Return Book" 
            desc="Process a book return and calculate fines." 
            icon={FileText} 
            href="/transactions/return-book"
            color="bg-orange-500"
          />
          {isAdmin && (
            <ActionCard 
              title="Maintenance" 
              desc="Add books, members, and manage users." 
              icon={Settings} 
              href="/maintenance/add-book"
              color="bg-pink-500"
            />
          )}
        </div>
      </section>
    </div>
  )
}

function ActionCard({ title, desc, icon: Icon, href, color }: any) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, translateY: -5 }}
        whileTap={{ scale: 0.98 }}
        className="group h-full"
      >
        <Card className="h-full border-border/40 hover:border-primary/40 hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              {title}
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {desc}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
