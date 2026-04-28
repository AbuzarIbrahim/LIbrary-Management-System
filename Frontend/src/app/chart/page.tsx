"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { GitGraph, Network, Layout, Database, FileText, Settings } from "lucide-react"

export default function ChartPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-4xl font-bold font-serif tracking-tight">System Flow Chart</h1>
        <p className="text-muted-foreground">Overall application architecture and user journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Module Breakdown */}
        <Card className="lg:col-span-1 border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Layout className="h-5 w-5 text-primary" /> Core Modules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <Settings className="h-5 w-5 mt-0.5 text-primary" />
              <div>
                <p className="font-bold text-sm">Maintenance</p>
                <p className="text-xs text-muted-foreground">Admin only. Manage books, memberships, and users.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
              <Database className="h-5 w-5 mt-0.5 text-accent" />
              <div>
                <p className="font-bold text-sm">Transactions</p>
                <p className="text-xs text-muted-foreground">Issue books, return books, and handle fine payments.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
              <FileText className="h-5 w-5 mt-0.5 text-green-500" />
              <div>
                <p className="font-bold text-sm">Reports</p>
                <p className="text-xs text-muted-foreground">Inventory listings, master lists, and active issues.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visual Flow */}
        <Card className="lg:col-span-2 border-border/40 overflow-hidden relative group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Network className="h-5 w-5 text-primary" /> Logical Flow Diagram
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-12 bg-muted/20">
            <div className="relative flex flex-col items-center gap-12 w-full max-w-md">
              
              {/* Login */}
              <FlowNode label="Login / Auth" color="bg-primary" />
              
              <div className="w-0.5 h-12 bg-border relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 border-b-2 border-r-2 border-border rotate-45" />
              </div>

              {/* Dashboard */}
              <FlowNode label="Main Dashboard" color="bg-secondary" />

              <div className="flex gap-24 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-12 border-x-2 border-t-2 border-border rounded-t-xl -translate-y-full" />
                
                <div className="flex flex-col items-center gap-4">
                  <FlowNode label="Maintenance" color="bg-orange-500" small />
                  <p className="text-[10px] text-muted-foreground">(Admin Only)</p>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <FlowNode label="Transactions" color="bg-blue-500" small />
                  <p className="text-[10px] text-muted-foreground">(All Users)</p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <FlowNode label="Reports" color="bg-green-500" small />
                  <p className="text-[10px] text-muted-foreground">(All Users)</p>
                </div>
              </div>

              {/* Transaction Detail */}
              <div className="w-0.5 h-8 bg-border relative mt-4">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 border-b-2 border-r-2 border-border rotate-45" />
              </div>

              <div className="p-4 border-2 border-dashed border-border rounded-2xl bg-background/50 text-center space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Transaction Lifecycle</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">Issue Book</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-[10px] bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded">Return Book</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded">Pay Fine</span>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FlowNode({ label, color, small }: { label: string, color: string, small?: boolean }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`${color} text-white ${small ? 'px-4 py-2' : 'px-8 py-4'} rounded-xl shadow-lg font-bold text-sm text-center min-w-[120px]`}
    >
      {label}
    </motion.div>
  )
}
