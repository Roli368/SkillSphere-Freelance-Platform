import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

import { registerSchema } from "../../schemas/authSchema";
import { registerUser } from "../../services/authApi";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/authSlice";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "freelancer",
    },
  });

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);

    try {
      dispatch(loginStart());

      const response = await registerUser(data);

      console.log("Server Response:", response.data);

      dispatch(loginSuccess(response.data.data));

      toast.success("Registration Successful 🎉");

      reset();

      navigate("/dashboard");
    } catch (error) {
      console.log("Register Error:", error.response?.data);

      dispatch(
        loginFailure(
          error.response?.data?.message ||
            "Registration Failed"
        )
      );

      if (error.response?.data?.errors) {
        const firstError = Object.values(
          error.response.data.errors
        )[0];

        toast.error(
          Array.isArray(firstError)
            ? firstError[0]
            : firstError
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Registration Failed"
        );
      }
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          register={register("fullName")}
          error={errors.fullName}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register("email")}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register("password")}
          error={errors.password}
        />

        <Select
          label="Role"
          register={register("role")}
          error={errors.role}
        >
          <option value="freelancer">
            Freelancer
          </option>

          <option value="client">
            Client
          </option>
        </Select>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Creating Account..."
            : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-slate-600">
        Already have an account?

        <Link
          to="/login"
          className="ml-2 font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </Card>
  );
}

export default RegisterForm;