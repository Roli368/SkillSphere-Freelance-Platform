import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { loginSchema } from "../../schemas/authSchema";
import { loginUser } from "../../services/authApi";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/authSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart());

      const response = await loginUser(data);

      dispatch(loginSuccess(response.data.data));

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      dispatch(
        loginFailure(
          error.response?.data?.message ||
            "Login Failed"
        )
      );

      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <Card className="w-full max-w-md">

      <h1 className="mb-6 text-center text-3xl font-bold dark:text-white">
        Welcome Back
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Email"
          type="email"
          placeholder="Enter Email"
          register={register("email")}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter Password"
          register={register("password")}
          error={errors.password}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Logging in..."
            : "Login"}
        </Button>
      </form>

      <p className="mt-5 text-center text-slate-600 dark:text-slate-400">
        Don't have an account?

        <Link
          to="/register"
          className="ml-2 font-semibold text-brand-600 dark:text-brand-400 hover:underline"
        >
          Register
        </Link>
      </p>

    </Card>
  );
}

export default LoginForm;