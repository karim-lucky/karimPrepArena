"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  });
  const onSubmit = (data: TestFormData) => {


    console.log("Form Data:", data);
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
            render={({ field }) => {
              const selectedIds = field.value || [];
              const availableSubjects = subjects.filter(
                (s) => !selectedIds.includes(s.id)
              );

              return (
                <Select
                  value=""
                  onValueChange={(val) => {
                    if (!selectedIds.includes(val)) {
                      field.onChange([...selectedIds, val]);
                    }
                  }}
                >
                  <SelectTrigger className="flex flex-wrap gap-2 min-h-[40px] items-center">
                    {selectedIds.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {selectedIds.map((id) => {
                          const subj = subjects.find((s) => s.id === id);
                          if (!subj) return null;
                          return (
                            <span
                              key={id}
                              className="bg-blue-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 text-sm"
                            >
                              {subj.name}
                              <button
                                type="button"
                                className="ml-1 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation(); // prevent opening select
                                  field.onChange(
                                    selectedIds.filter((v) => v !== id)
                                  );
                                }}
                              >
                                ✕
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <SelectValue placeholder="Choose subjects" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubjects.map((subj) => (
                      <SelectItem key={subj.id} value={subj.id}>
                        {subj.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
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
  <Button type="submit" className="bg-green-400 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-600" variant="secondary">
    Save Test
  </Button>
</div> 
      </form>
    </div>
  );
}
