"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const subjects = [
  { id: "1", name: "Biology" },
  { id: "2", name: "Chemistry" },
  { id: "3", name: "English" },
  { id: "4", name: "History" },
  { id: "5", name: "Geography" },
  { id: "6", name: "Physics" },
  { id: "7", name: "Mathematics" },
  { id: "8", name: "Islamic Studies" },
];

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
  maxAttempts: number;
  instructions: string[];
  createdBy: string; // userId
}

export default function CreateTestForm() {
  const [tests, setTests] = useState<TestFormData[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TestFormData>({
    defaultValues: {
      title: "",
      description: "",
      duration: 0,
      totalQuestions: 0,
      passingPercentage: 0,
      //   category: "",
      subjects: [],
      price: 0,
      startDate: "",
      endDate: "",
      isActive: true,
      scheduleType: "fixed",
      maxAttempts: 1,
      instructions: [],
      createdBy: "",
    },
  });

  const onSubmit = (data: TestFormData) => {
    const newTest: TestFormData = {
      ...data,
      duration: Number(data.duration),
      totalQuestions: Number(data.totalQuestions),
      passingPercentage: Number(data.passingPercentage),
      price: Number(data.price),
      maxAttempts: Number(data.maxAttempts),
      isActive: data.isActive,
      subjects: data.subjects.filter((s) => s.trim() !== ""),
      instructions: data.instructions.filter((i) => i.trim() !== ""),
    };

    setTests([newTest, ...tests]);
    console.log("Saved test:", newTest);
    reset();
  };

  return (
    <div className="max-w-full mx-auto bg-white text-black dark:bg-neutral-900 dark:text-white shadow-lg rounded-2xl p-6 transition-colors">         <h2 className="text-xl font-bold mb-4">Create New Test</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Input placeholder="Test Title" {...register("title", { required: "Title is required" })} />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}

        <Textarea
          className="  rounded  "
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}

        {/* <Input type="text" placeholder="Category" {...register("category", { required: true })} /> */}

        <div className="flex gap-2">
          <Input type="number" placeholder="Duration (min)" {...register("duration", { min: 1 })} />
          <Input type="number" placeholder="Total Questions" {...register("totalQuestions", { min: 1 })} />
        </div>

        <div className="flex gap-2">
          {/* <Input type="number" placeholder="Passing %" {...register("passingPercentage", { min: 1, max: 100 })} /> */}
          <Input type="number" placeholder="Price" {...register("price",


          )} />
        </div>

        <div className="flex gap-2">
          <Input type="datetime-local" {...register("startDate", { required: true })} />
          <Input type="datetime-local" {...register("endDate", { required: true })} />
        </div>

        <div className="flex flex-col gap-2">
          <label>Status</label>
          <Controller
            name="isActive"
            control={control}
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
        </div>

        <div className="flex flex-col gap-2">
          <label>Schedule Type</label>
          <Controller
            name="scheduleType"
            control={control}
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
        </div>
        

        <Input type="number" placeholder="Max Attempts" {...register("maxAttempts", { min: 1 })} />

        <div className="flex flex-col gap-2">
          <label>Select Subject</label>
          <Controller
            name="subjects"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value[0] || ""}
                onValueChange={(val) => field.onChange([val])} // single select stored as array
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj.id} value={subj.id}>
                      {subj.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.subjects && (
            <span className="text-red-500 text-xs">Subject is required</span>
          )}
        </div>


        <textarea
          className="border rounded p-2"
          placeholder="Instructions (comma separated)"
          {...register("instructions", {
            setValueAs: (v) =>
              typeof v === "string" && v.trim().length > 0
                ? v.split(",").map((s: string) => s.trim())
                : [],
          })}
        />



        {/* <Input type="text" placeholder="Created By (User ID)" {...register("createdBy", { required: true })} /> */}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Cancel
          </Button>
          <Button type="submit">Save Test</Button>
        </div>
      </form>
    </div>
  );
}
