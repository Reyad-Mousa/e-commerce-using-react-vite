import { Button, Spinner, Form } from "react-bootstrap";
import Input from "@components/Form/input/Input";
import { Navigate } from "react-router-dom";
import useRegister from "@hooks/useregister";

// type TFormInput = {
//   firstName: string;
//   lastName: string;
//   emailAddress: string;
//   password: string;
//   confirmPassword: string;
// }; === type TFormInput = z.infer<typeof signUpScheme>;

const Register = () => {
  const {
    loading,
    error,
    accessToken,
    emailAvailability,
    formErrors,
    submitForm,
    emailOnBlurHandler,
    register,
    handleSubmit,
  } = useRegister();
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <div
      className=" col-lg-4 "
      style={{ display: "block", padding: 30, margin: "0 auto" }}
    >
      <h4 className=" text-center fw-bold mb-5">Register Account</h4>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Input
          label="First Name"
          name="firstName"
          error={formErrors.firstName?.message}
          register={register}
        />
        <Input
          label="Last Name"
          name="lastName"
          error={formErrors.lastName?.message}
          register={register}
        />
        <Input
          label="Email Address"
          name="email"
          register={register}
          onBlur={emailOnBlurHandler}
          error={
            formErrors.email?.message
              ? formErrors.email?.message
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
          type="password"
          error={formErrors.password?.message}
          register={register}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          error={formErrors.confirmPassword?.message}
          register={register}
        />
        <Button
          variant="info"
          type="submit"
          style={{ color: "white", marginTop: "14px" }}
          disabled={
            emailAvailability === "checking"
              ? true
              : false || loading === "pending"
          }
        >
          {loading === "pending" ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            "Submit"
          )}
        </Button>
        {error && (
          <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
        )}
      </Form>
    </div>
  );
};

export default Register;
