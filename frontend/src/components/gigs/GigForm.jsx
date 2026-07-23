import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";

import { gigSchema } from "../../schemas/gigSchema";
import { createGig, updateGig } from "../../services/gigApi";

function GigForm({ gigData }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(gigSchema),

    defaultValues: gigData ? {
      title: gigData.title || "",
      description: gigData.description || "",
      category: gigData.category || "",
      budget: gigData.budget ? String(gigData.budget) : "",
      skills: gigData.skills ? gigData.skills.join(", ") : "",
      deadline: gigData.deadline ? gigData.deadline.substring(0, 10) : "",
      experienceLevel: gigData.experienceLevel || "Beginner",
    } : {
      title: "",
      description: "",
      category: "",
      budget: "",
      skills: "",
      deadline: "",
      experienceLevel: "Beginner",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        skills: data.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      if (gigData) {
        await updateGig(gigData._id, payload);
        toast.success("Gig Updated Successfully 🚀");
        navigate(`/gig/${gigData._id}`);
      } else {
        await createGig(payload);
        toast.success("Gig Created Successfully 🚀");
        reset();
        navigate("/my-gigs");
      }
    } catch (err) {
      console.log(err);
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0];
        toast.error(firstError);
      } else {
        toast.error(err.response?.data?.message || "Something went wrong.");
      }
    }
  };

  return (
    <Card className="mx-auto max-w-4xl p-8 sm:p-10 border-0 shadow-xl shadow-brand-500/5">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          {gigData ? "Edit Gig" : "Post a New Gig"}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {gigData ? "Update your gig details." : "Provide clear details to attract the best talent for your project."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Basic Info */}
        <div className="space-y-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Project Basics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Project Title"
                placeholder="e.g. Full Stack React Developer Needed for E-commerce"
                register={register("title")}
                error={errors.title}
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                label="Detailed Description"
                placeholder="Describe your project requirements, goals, and what you expect from the freelancer..."
                register={register("description")}
                error={errors.description}
              />
            </div>
          </div>
        </div>

        {/* Requirements & Budget */}
        <div className="space-y-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Requirements & Budget</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Category"
              placeholder="e.g. Web Development"
              register={register("category")}
              error={errors.category}
            />
            
            <Select
              label="Experience Level Required"
              register={register("experienceLevel")}
              error={errors.experienceLevel}
            >
              <option value="Beginner">Beginner (1-2 yrs)</option>
              <option value="Intermediate">Intermediate (3-5 yrs)</option>
              <option value="Expert">Expert (5+ yrs)</option>
            </Select>

            <Input
              label="Required Skills (comma separated)"
              placeholder="React, Node.js, Tailwind"
              register={register("skills")}
              error={errors.skills}
            />

            <Input
              label="Budget ($)"
              type="number"
              placeholder="e.g. 500"
              register={register("budget")}
              error={errors.budget}
            />

            <div className="md:col-span-2">
              <Input
                label="Project Deadline"
                type="date"
                register={register("deadline")}
                error={errors.deadline}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-10 py-4 text-lg">
            {isSubmitting ? (gigData ? "Updating..." : "Publishing Gig...") : (gigData ? "Update Gig" : "Publish Gig")}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default GigForm;