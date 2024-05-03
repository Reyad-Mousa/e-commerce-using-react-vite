import { useForm, SubmitHandler } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "src/validations/loginSchema";
import Input from "@components/Form/input/Input";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });
  const submitForm: SubmitHandler<loginType> = (data) => {
    console.log(data);
  };

  return (
    <div style={{ display: "block", padding: 30 }}>
      <h4 className=" text-center fw-bold mb-5">Login</h4>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Input
          label="Email Address"
          name="email"
          error={errors.email?.message}
          register={register}
        />
        <Input
          label="Password"
          name="password"
          error={errors.password?.message}
          register={register}
        />
        <Button
          variant="info"
          type="submit"
          style={{ color: "white", marginTop: "14px" }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
