import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { loginUser } from "../../services/authApi";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/authSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      dispatch(loginStart());

      const { data } = await loginUser(form);

      dispatch(loginSuccess(data.data));

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      dispatch(
        loginFailure(
          error.response?.data?.message || "Login Failed"
        )
      );

      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome Back
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <Input
          label="Email"
          type="email"
          placeholder="Enter Email"
          register={{
            name: "email",
            value: form.email,
            onChange: handleChange,
          }}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter Password"
          register={{
            name: "password",
            value: form.password,
            onChange: handleChange,
          }}
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

      </form>

      <p className="mt-5 text-center">

        Don't have an account?

        <Link
          to="/register"
          className="text-blue-600 ml-2"
        >
          Register
        </Link>

      </p>

    </Card>
  );
}

export default LoginForm;