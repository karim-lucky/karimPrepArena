"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { MultiSelect } from "@/components/ui/MultiSelect";
const subjects = [
  { label: "Math", value: "650fbc27d9e3f99c9df3a111" },
  { label: "Science", value: "650fbc27d9e3f99c9df3a222" },
  { label: "English", value: "650fbc27d9e3f99c9df3a333" },
]

interface TestFormData {
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  passingPercentage: number;
  //   category: string;
  subjects: string[]; // store ObjectIds as strings
  price: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  scheduleType: "fixed" | "flexible";

  instructions: string[];
  createdBy: string; // userId
}

export default function CreateTestForm() {
  const [tests, setTests] = useState<TestFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TestFormData>({
  });
  const onSubmit = async (data: TestFormData) => {
    setLoading(true);
    data.createdBy = "650fbc27d9e3f99c9df3a222"; // Replace with actual user ID
    try {
      const response = await axios.post("http://localhost:3000/api/test/create", data);
      setTests([...tests, response.data]);
      toast.success("Test created successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to create test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto bg-white text-black dark:bg-neutral-900 dark:text-white shadow-lg rounded-2xl p-6 transition-colors">         <h2 className="text-xl font-bold mb-4">Create New Test</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input placeholder="Test Title" {...register("title", { required: "Title is required" })} />
          {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
        </div>
        <div>

          <Label htmlFor="description">Description</Label>
          <Textarea
            className="  rounded  "
            placeholder="Description"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
        </div>

        {/* <Input type="text" placeholder="Category" {...register("category", { required: true })} /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <Label htmlFor="duration">Duration (min)</Label>
            <Input type="number" placeholder="Duration (min)" {...register("duration", { required: "Duration is required", min: 1 })} />
            {errors.duration && <span className="text-red-500 text-xs">{errors.duration.message}</span>}
          </div>

          <div>
            <Label htmlFor="totalQuestions">Total Questions</Label>
            <Input type="number" placeholder="Total Questions" {...register("totalQuestions", { required: "Total Questions is required", min: 1 })} />
            {errors.totalQuestions && <span className="text-red-500 text-xs">{errors.totalQuestions.message}</span>}
          </div>
        </div>


        <div className=" gap-2">
          <Label htmlFor="price">Price</Label>

          {/* <Input type="number" placeholder="Passing %" {...register("passingPercentage", { min: 1, max: 100 })} /> */}
          <Input type="number" placeholder="Price" {...register("price", { required: "Price is required", min: 0 })} />
          {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="datetime-local"
              {...register("startDate", { required: "Start Date is required" })}

            />
            {errors.startDate && <span className="text-red-500 text-xs">{errors.startDate.message}</span>}
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="datetime-local"
              {...register("endDate", { required: "End Date is required" })}
            />
            {errors.endDate && <span className="text-red-500 text-xs">{errors.endDate.message}</span>}
          </div>
        </div>


        <div className="flex flex-col gap-2">
          <Label htmlFor="status">Status</Label>

          <Controller
            name="isActive"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select
                onValueChange={(val) => field.onChange(val === "true")}
                value={field.value ? "true" : "false"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.isActive && <span className="text-red-500 text-xs">{errors.isActive.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="scheduleType">Schedule Type</Label>
          <Controller
            name="scheduleType"
            control={control}
            rules={{ required: "Schedule Type is required" }}
            defaultValue="fixed" // set default here
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.scheduleType && <span className="text-red-500 text-xs">{errors.scheduleType.message}</span>}
        </div>


        {/* <Input type="number" placeholder="Max Attempts" {...register("maxAttempts", { min: 1 })} /> */}

        <div className="flex flex-col gap-2">
          <Label htmlFor="subjects">Subjects</Label>
          <Controller
            name="subjects"
            control={control}
            rules={{ required: "At least one subject is required" }}
            render={({ field }) => (
              <MultiSelect
                options={subjects}
                field={field}
                placeholder="Choose subjects"
                 
              />
            )}
          />
          {errors.subjects && (
            <span className="text-red-500 text-xs">Subject is required</span>
          )}

          {errors.subjects && (
            <span className="text-red-500 text-xs">Subject is required</span>
          )}
        </div>

        <Label htmlFor="instructions">Instructions</Label>
        <Textarea
          className="border rounded p-2"
          placeholder="Instructions (comma separated)"
          {...register("instructions", { required: "At least one instruction is required" })}
        />
        {errors.instructions && <span className="text-red-500 text-xs">{errors.instructions.message}</span>}



        {/* <Input type="text" placeholder="Created By (User ID)" {...register("createdBy", { required: true })} /> */}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Cancel
          </Button>
          <Button type="submit" className="bg-green-400 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-600 flex items-center justify-center" variant="secondary" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : null}
            {loading ? "Submitting..." : "Save Test"}
          </Button>
        </div>
      </form>
    </div>
  );
}
