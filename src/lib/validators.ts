import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(2).max(80).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6).max(128),
});

export const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1).max(128),
});

export const demoBookingSchema = z.object({
  parentName: z.string().min(2).max(80).trim(),
  phone: z.string().min(7).max(20).trim(),
  email: z.string().email().toLowerCase().trim(),
  childName: z.string().min(2).max(60).trim(),
  course: z.enum(["AI Explorers", "AI Builders", "AI Innovators"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().min(1).max(30).trim(),
});
