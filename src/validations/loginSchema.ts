import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Please enter your Email " }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[!@#$%&*()_+{}|":<>?]/, {
      message: "Password should contain at least 1 special character",
    }),
});
type loginType = z.infer<typeof loginSchema>;

export { loginSchema, type loginType };
