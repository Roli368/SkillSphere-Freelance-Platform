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

  import { uploadAvatar } from "../../services/authApi";
  import { useState, useRef } from "react";
  import { ImagePlus } from "lucide-react";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart());
      const response = await registerUser(data);
      const { user, accessToken } = response.data.data;
      
      // Dispatch loginSuccess so axios interceptor can pick up the new token
      dispatch(loginSuccess(response.data.data));

      let finalUser = user;

      // Upload avatar if selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        
        try {
          const avatarRes = await uploadAvatar(formData);
          finalUser = avatarRes.data.data;
          // Update redux with the new user that has the avatar
          dispatch(loginSuccess({ user: finalUser, accessToken }));
        } catch (avatarErr) {
          toast.error("Account created, but avatar upload failed.");
          console.error(avatarErr);
        }
      }

      toast.success("Registration Successful 🎉");
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.log("Register Error:", error.response?.data);
      dispatch(
        loginFailure(
          error.response?.data?.message || "Registration Failed"
        )
      );

      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        toast.error(error.response?.data?.message || "Registration Failed");
      }
    }
  };

  return (
    <Card className="w-full max-w-lg p-8 sm:p-10 border-0 shadow-2xl shadow-brand-500/10">
      <h1 className="mb-2 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
        Create Account
      </h1>
      <p className="mb-8 text-center text-slate-500 dark:text-slate-400">
        Join SkillSphere and start your journey today.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Avatar Upload UI */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative h-24 w-24 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center overflow-hidden cursor-pointer hover:border-brand-500 dark:hover:border-brand-500 transition-colors group"
          >
            {avatarPreview ? (
              <>
                <img src={avatarPreview} alt="Preview" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ImagePlus className="text-white" size={24} />
                </div>
              </>
            ) : (
              <div className="text-slate-400 flex flex-col items-center group-hover:text-brand-500 transition-colors">
                <ImagePlus size={28} />
                <span className="text-[10px] mt-1 font-medium uppercase tracking-wider">Upload</span>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
        </div>

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
          label="I want to"
          register={register("role")}
          error={errors.role}
        >
          <option value="freelancer">Work as a Freelancer</option>
          <option value="client">Hire Talent</option>
        </Select>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?

        <Link
          to="/login"
          className="ml-2 font-semibold text-brand-600 dark:text-brand-400 hover:underline hover:text-brand-700"
        >
          Log in
        </Link>
      </p>
    </Card>
  );
}

export default RegisterForm;