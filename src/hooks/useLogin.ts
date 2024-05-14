import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "src/validations/loginSchema";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useEffect } from "react";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<loginType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });
  const submitForm: SubmitHandler<loginType> = async (data) => {
    if (searchParams.get("message") === "account_created") {
      setSearchParams("");
    }
    const { email, password } = data;
    dispatch(actAuthLogin({ email, password }))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return {
    searchParams,
    loading,
    error,
    accessToken,
    formErrors,
    submitForm,
    register,
    handleSubmit,
  };
};

export default useLogin;
