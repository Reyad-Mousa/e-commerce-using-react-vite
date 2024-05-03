import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "Please enter your FirstName" }),
    lastName: z.string().min(1, { message: "Please enter your lastName" }),
    email: z.string().min(1, { message: "Please enter your Email " }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[!@#$%&*()_+{}|":<>?]/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Confirm Password does not match the password",
    path: ["confirmPassword"],
  });

type signUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type signUpType };
