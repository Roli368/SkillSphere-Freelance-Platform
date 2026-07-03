import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { registerUser } from "../../services/authApi";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/authSlice";

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "freelancer",
  });

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

      const { data } = await registerUser(form);

      dispatch(loginSuccess(data.data));

      toast.success("Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      dispatch(
        loginFailure(
          error.response?.data?.message || "Registration Failed"
        )
      );

      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input
          label="Full Name"
          register={{
            name: "fullName",
            value: form.fullName,
            onChange: handleChange,
          }}
        />

        <Input
          label="Email"
          type="email"
          register={{
            name: "email",
            value: form.email,
            onChange: handleChange,
          }}
        />

        <Input
          label="Password"
          type="password"
          register={{
            name: "password",
            value: form.password,
            onChange: handleChange,
          }}
        />

        <div>
          <label className="font-semibold">
            Select Role
          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border p-3"
          >
            <option value="freelancer">
              Freelancer
            </option>

            <option value="client">
              Client
            </option>
          </select>
        </div>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </Button>
      </form>

      <p className="mt-5 text-center">
        Already have an account?

        <Link
          to="/login"
          className="text-blue-600 ml-2"
        >
          Login
        </Link>
      </p>
    </Card>
  );
}

export default RegisterForm;