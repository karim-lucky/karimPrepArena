import mongoose, { Schema, Document } from "mongoose";

export interface IEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  testId: mongoose.Types.ObjectId;
  status: "pending" | "approved";
  paymentStatus: "pending" | "completed";
  createdAt: Date;
}

const EnrollmentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
  paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Enrollment || mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
