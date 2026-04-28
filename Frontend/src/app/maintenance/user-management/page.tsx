"use client"
import { useState } from "react"
import useUsers from "@/hooks/queries/useUsers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
export default function UserManagementPage() {
  const { getUsers, createUser } = useUsers()
  const users = getUsers.data
  const isLoading = getUsers.isLoading
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    type: "new"
  })
  const [error, setError] = useState("")
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.type === "new" && (!formData.name || !formData.email || !formData.password)) {
      setError("Name, Email, and Password are mandatory for new users.")
      return
    }
    setError("")
    createUser.mutate(formData, {
      onSuccess: () => {
        alert("User processed successfully")
        setFormData({ name: "", email: "", password: "", role: "user", type: "new" })
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || "Failed to process user")
      }
    })
  }
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <p className="text-destructive text-sm">{error}</p>}
              <div className="space-y-2">
                <Label>User Type</Label>
                <RadioGroup 
                  defaultValue="new" 
                  onValueChange={(v) => setFormData({...formData, type: v})}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new_u" />
                    <Label htmlFor="new_u">New User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="ext_u" />
                    <Label htmlFor="ext_u">Existing User</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>
              {formData.type === "new" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      value={formData.password} 
                      onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label>Role</Label>
                <RadioGroup 
                  defaultValue="user" 
                  onValueChange={(v) => setFormData({...formData, role: v})}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="r_user" />
                    <Label htmlFor="r_user">User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="r_admin" />
                    <Label htmlFor="r_admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={createUser.isPending}>
                {createUser.isPending ? "Processing..." : "Confirm"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Master List of Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
              ) : (
                users?.map((u: any) => (
                  <TableRow key={u._id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell className="capitalize">{u.role}</TableCell>
                    <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
