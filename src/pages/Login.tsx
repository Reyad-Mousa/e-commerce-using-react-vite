import { Form, Button, Alert, Col, Spinner } from "react-bootstrap";
import Input from "@components/Form/input/Input";
import useLogin from "@hooks/useLogin";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {
    searchParams,
    loading,
    error,
    formErrors,
    accessToken,
    submitForm,
    register,
    handleSubmit,
  } = useLogin();

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className=" col-lg-4 "
      style={{ display: "block", padding: 30, margin: "0 auto" }}
    >
      <h4 className=" text-center fw-bold mb-5">Login</h4>

      <Form onSubmit={handleSubmit(submitForm)}>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your Account Successfully Created , Please Login
            </Alert>
          )}
        </Col>
        <Input
          label="Email Address"
          name="email"
          error={formErrors.email?.message}
          register={register}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          error={formErrors.password?.message}
          register={register}
        />
        <Button
          variant="info"
          type="submit"
          style={{ color: "white", marginTop: "14px" }}
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

export default Login;
