import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(4, { message: "Please enter your Email required" })
    .email(),
  password: z.string().min(4, { message: "Password is required" }),
});
type loginType = z.infer<typeof loginSchema>;

export { loginSchema, type loginType };
