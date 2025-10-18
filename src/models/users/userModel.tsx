import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["STUDENT", "ADMIN", "TEACHER"],
      default: "STUDENT",
    },

    institute: {
      type: String,
      default: null,
    },

    contact: {
      type: String,
      default: null,
    },

    isApproved: {
      type: Boolean,
      default: false, // Admins auto-approved in backend logic
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// prevent model overwrite during hot reload in Next.js
const Users = mongoose.models.Users || mongoose.model("Users", UsersSchema);

export default Users;
