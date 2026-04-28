"use client"

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

export default function AddMembershipPage() {
  const { addMember } = useMembers()
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      membershipNumber: "MEM-" + Math.floor(Math.random() * 1000000),
      duration: "6 months",
      expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
    },
  })

  const onSubmit = (data: MemberFormValues) => {
    addMember.mutate(data, {
      onSuccess: (res: { success: boolean; data?: Member; message?: string }) => {
        if (res.success) {
          alert("Membership added successfully. Member ID: " + data.membershipNumber)
          reset({
            name: "",
            membershipNumber: "MEM-" + Math.floor(Math.random() * 1000000),
            duration: "6 months",
            expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
          })
        } else {
          alert(res.message || "Failed to add membership")
        }
      },
    })
  }

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Membership</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Member Name</Label>
              <Input 
                id="name" 
                className={errors.name ? 'border-destructive' : ''}
                {...register("name")}
              />
              {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="membershipNumber">Membership Number</Label>
              <Input 
                id="membershipNumber" 
                readOnly
                className="bg-muted"
                {...register("membershipNumber")}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <RadioGroup 
                    value={field.value} 
                    onValueChange={(v) => {
                      field.onChange(v);
                      // Update expiry date automatically
                      const expiry = new Date();
                      if (v === "6 months") expiry.setMonth(expiry.getMonth() + 6);
                      if (v === "1 year") expiry.setFullYear(expiry.getFullYear() + 1);
                      if (v === "2 years") expiry.setFullYear(expiry.getFullYear() + 2);
                      reset({ ...control._formValues, expiryDate: expiry.toISOString().split('T')[0] }, { keepValues: true });
                    }}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="6 months" id="6m" />
                      <Label htmlFor="6m">6 Months</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1 year" id="1y" />
                      <Label htmlFor="1y">1 Year</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2 years" id="2y" />
                      <Label htmlFor="2y">2 Years</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input 
                id="expiryDate" 
                type="date"
                readOnly
                className="bg-muted"
                {...register("expiryDate")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={addMember.isPending}>
              {addMember.isPending ? "Adding..." : "Confirm"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
