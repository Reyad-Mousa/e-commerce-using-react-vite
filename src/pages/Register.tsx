import { useForm, SubmitHandler } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpType } from "src/validations/signUpSchema";
import Input from "@components/Form/input/Input";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

// type TFormInput = {
//   firstName: string;
//   lastName: string;
//   emailAddress: string;
//   password: string;
//   confirmPassword: string;
// }; === type TFormInput = z.infer<typeof signUpScheme>;

const Register = () => {
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });
  const submitForm: SubmitHandler<signUpType> = (data) => {
    console.log(data);
  };

  const {
    emailAvailability,
    enterEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { invalid, isDirty } = getFieldState("email");
    if (isDirty && !invalid && enterEmail !== value) {
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && enterEmail) {
      resetCheckEmailAvailability();
    }
  };

  return (
    <div style={{ display: "block", padding: 30 }}>
      <h4 className=" text-center fw-bold mb-5">Register Account</h4>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Input
          label="First Name"
          name="firstName"
          error={errors.firstName?.message}
          register={register}
        />
        <Input
          label="Last Name"
          name="lastName"
          error={errors.lastName?.message}
          register={register}
        />
        <Input
          label="Email Address"
          name="email"
          register={register}
          onBlur={emailOnBlurHandler}
          error={
            errors.email?.message
              ? errors.email?.message
              : emailAvailability === "notAvailable"
              ? "This email is already in use."
              : emailAvailability === "failed"
              ? "Error from the server."
              : ""
          }
          textForm={
            emailAvailability === "checking"
              ? "please wait, checking your email"
              : ""
          }
          success={emailAvailability === "available" ? "Email can be used" : ""}
          disabled={emailAvailability === "checking" ? true : false}
        />
        <Input
          label="Password"
          name="password"
          error={errors.password?.message}
          register={register}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          error={errors.confirmPassword?.message}
          register={register}
        />
        <Button
          variant="info"
          type="submit"
          style={{ color: "white", marginTop: "14px" }}
          disabled={emailAvailability === "checking" ? true : false}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
