import mongoose, { Schema, Document } from "mongoose";

export interface ITestAttempt extends Document {
  userId: mongoose.Types.ObjectId;
  testId: mongoose.Types.ObjectId;
  score: number;
  startedAt: Date;
  completedAt: Date;
  status: "completed" | "in-progress";
  answers: {
    questionId: mongoose.Types.ObjectId;
    selectedOptionIndex: number;
    isCorrect: boolean;
  }[];
}

const TestAttemptSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
  score: { type: Number, required: true },
  startedAt: { type: Date, required: true },
  completedAt: { type: Date },
  status: { type: String, enum: ["completed", "in-progress"], required: true },
  answers: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
      selectedOptionIndex: { type: Number, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

export default mongoose.models.TestAttempt || mongoose.model<ITestAttempt>("TestAttempt", TestAttemptSchema);
