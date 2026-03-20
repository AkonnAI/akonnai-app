import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(2).max(80).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1).max(128),
});

const today = new Date(); today.setHours(0, 0, 0, 0);
const maxDate = new Date(); maxDate.setDate(maxDate.getDate() + 60);

export const demoBookingSchema = z.object({
  parentName: z.string().min(2).max(80).trim(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit Indian mobile required"),
  email: z.string().email().toLowerCase().trim(),
  childName: z.string().min(2).max(60).trim(),
  grade: z.enum(["Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"]),
  course: z.enum(["AI Explorers", "AI Builders", "AI Innovators"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((d) => {
    const dt = new Date(d); return dt >= today && dt <= maxDate;
  }, "Date must be within next 60 days"),
  time: z.string().min(1).max(30).trim(),
});
