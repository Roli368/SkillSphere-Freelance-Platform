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
import { createGig } from "../../services/gigApi";

function GigForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(gigSchema),

    defaultValues: {
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

      await createGig(payload);

      toast.success("Gig Created Successfully 🚀");

      reset();

      navigate("/browse-gigs");
    } catch (err) {
      console.log(err);

      if (err.response?.data?.errors) {
        const firstError = Object.values(
          err.response.data.errors
        )[0];

        toast.error(firstError);
      } else {
        toast.error(
          err.response?.data?.message ||
            "Something went wrong."
        );
      }
    }
  };

  return (
    <Card className="mx-auto max-w-4xl">

      <h1 className="mb-8 text-center text-4xl font-bold">
        Create New Gig
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        <Input
          label="Title"
          placeholder="React Developer Required"
          register={register("title")}
          error={errors.title}
        />

        <Textarea
          label="Description"
          placeholder="Describe your project..."
          register={register("description")}
          error={errors.description}
        />

        <Input
          label="Budget (₹)"
          type="number"
          placeholder="25000"
          register={register("budget")}
          error={errors.budget}
        />

        <Input
          label="Category"
          placeholder="Web Development"
          register={register("category")}
          error={errors.category}
        />

        <Select
          label="Experience Level"
          register={register("experienceLevel")}
          error={errors.experienceLevel}
        >
          <option value="Beginner">
            Beginner
          </option>

          <option value="Intermediate">
            Intermediate
          </option>

          <option value="Expert">
            Expert
          </option>
        </Select>

        <Input
          label="Skills"
          placeholder="React, Node.js, MongoDB"
          register={register("skills")}
          error={errors.skills}
        />

        <Input
          label="Deadline"
          type="date"
          register={register("deadline")}
          error={errors.deadline}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Creating..."
            : "Create Gig"}
        </Button>

      </form>

    </Card>
  );
}

export default GigForm;