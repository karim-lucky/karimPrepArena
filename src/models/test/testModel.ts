import mongoose, { Schema } from "mongoose";

// export interface ITest extends Document {
//   title: string;
//   description: string;
//   duration: number;
//   totalQuestions: number;
//   passingPercentage: number;
//   category: string;
//   price: number;
//   startDate: Date;
//   endDate: Date;
//   isActive: boolean;
//   createdAt: Date;
// }

// const TestSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   duration: { type: Number, required: true },
//   totalQuestions: { type: Number, required: true },
//   passingPercentage: { type: Number, required: true },
//   category: { type: String, required: true },
//   price: { type: Number, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   isActive: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Test || mongoose.model<ITest>("Test", TestSchema);


const SubjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});
export const Subject = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
const TestSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },

  price: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  scheduleType: { type: String, enum: ["fixed", "flexible"], required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject", required: true }],
  instructions: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Test = mongoose.models.Test || mongoose.model("Test", TestSchema);


