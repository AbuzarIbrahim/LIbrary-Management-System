import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["user", "admin"]),
});

export const bookSchema = z.object({
  title: z.string().min(1, { message: "Book title is required" }),
  author: z.string().min(1, { message: "Author name is required" }),
  type: z.enum(["book", "movie"]),
  serialNumber: z.string().min(1, { message: "Serial number is required" }),
});

export const memberSchema = z.object({
  name: z.string().min(1, { message: "Member name is required" }),
  membershipNumber: z.string().min(1, { message: "Membership number is required" }),
  duration: z.enum(["6 months", "1 year", "2 years"]),
  expiryDate: z.string().min(1, { message: "Expiry date is required" }),
});

export const issueSchema = z.object({
  bookId: z.string().min(1, { message: "Book selection is required" }),
  memberId: z.string().min(1, { message: "Member selection is required" }),
  issueDate: z.string().min(1, { message: "Issue date is required" }).refine((val) => {
    const date = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, { message: "Issue date cannot be earlier than today" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  remarks: z.string().optional(),
}).refine((data) => {
  const issue = new Date(data.issueDate);
  const due = new Date(data.dueDate);
  const maxDue = new Date(issue);
  maxDue.setDate(issue.getDate() + 15);
  
  return due > issue && due <= maxDue;
}, {
  message: "Due date must be after issue date and within 15 days",
  path: ["dueDate"]
});


export const returnSchema = z.object({
  transactionId: z.string().min(1, { message: "Transaction selection is required" }),
  returnDate: z.string().optional(),
  remarks: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type BookFormValues = z.infer<typeof bookSchema>;
export type MemberFormValues = z.infer<typeof memberSchema>;
export type IssueFormValues = z.infer<typeof issueSchema>;
export type ReturnFormValues = z.infer<typeof returnSchema>;
