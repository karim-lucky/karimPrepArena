import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  testId: mongoose.Types.ObjectId;
  text: string;
  options: string[];
  correctOptionIndex: number;
  points: number;
}

const QuestionSchema: Schema = new Schema({
  testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
  points: { type: Number, required: true },
});

export default mongoose.models.Question || mongoose.model<IQuestion>("Question", QuestionSchema);
