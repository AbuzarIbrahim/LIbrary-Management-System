"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { memberSchema, MemberFormValues } from "@/lib/validation"
import useMembers from "@/hooks/queries/useMembers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Member } from "@/types"
import { Search, UserMinus, UserPlus } from "lucide-react"

export default function UpdateMembershipPage() {
  const { getMembers, updateMember } = useMembers()
  const members = getMembers.data || []
  
  const [membershipNo, setMembershipNo] = useState("")
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [error, setError] = useState("")

  const handleSearch = () => {
    if (!membershipNo) {
      setError("Membership number is mandatory.")
      return
    }
    const found = members.find(m => m.membershipNumber === membershipNo)
    if (found) {
      setSelectedMember(found)
      setError("")
    } else {
      setSelectedMember(null)
      setError("No member found with that membership number.")
    }
  }

  const handleExtend = (months: number) => {
    if (!selectedMember) return
    
    const currentExpiry = new Date(selectedMember.expiryDate)
    const newExpiry = new Date(currentExpiry.setMonth(currentExpiry.getMonth() + months))
    
    updateMember.mutate({ 
      id: selectedMember._id, 
      expiryDate: newExpiry.toISOString().split('T')[0],
      status: 'active'
    } as any, {
      onSuccess: (res: { success: boolean; message?: string }) => {
        if (res.success) {
          alert(`Membership extended by ${months} months. New expiry: ${newExpiry.toLocaleDateString()}`)
          setSelectedMember(null)
          setMembershipNo("")
        } else {
          alert(res.message || "Failed to extend membership")
        }
      },
    })
  }

  const handleCancel = () => {
    if (!selectedMember) return
    
    if (confirm("Are you sure you want to cancel this membership?")) {
      updateMember.mutate({ 
        id: selectedMember._id, 
        status: 'cancelled'
      } as any, {
        onSuccess: (res: { success: boolean; message?: string }) => {
          if (res.success) {
            alert("Membership cancelled successfully")
            setSelectedMember(null)
            setMembershipNo("")
          } else {
            alert(res.message || "Failed to cancel membership")
          }
        },
      })
    }
  }

  return (
    <div className="p-8 space-y-8 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Search Member to Update</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="membershipNo">Membership Number</Label>
              <Input 
                id="membershipNo" 
                placeholder="MEM-XXXXXX" 
                value={membershipNo}
                onChange={(e) => setMembershipNo(e.target.value)}
              />
            </div>
            <Button className="mt-8" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
        </CardContent>
      </Card>

      {selectedMember && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Name</p>
                <p className="font-medium">{selectedMember.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Status</p>
                <p className={`font-medium capitalize ${selectedMember.status === 'active' ? 'text-green-500' : 'text-destructive'}`}>
                  {selectedMember.status}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Current Expiry</p>
                <p className="font-medium">{new Date(selectedMember.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="pt-4 border-t space-y-4">
              <Label>Extension Options (Default 6 months)</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExtend(6)}>6 Months</Button>
                <Button variant="outline" size="sm" onClick={() => handleExtend(12)}>1 Year</Button>
                <Button variant="outline" size="sm" onClick={() => handleExtend(24)}>2 Years</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button variant="destructive" className="flex-1 gap-2" onClick={handleCancel}>
              <UserMinus className="h-4 w-4" /> Cancel Membership
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
