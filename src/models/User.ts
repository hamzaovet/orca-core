import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name?: string;
  username: string;
  email?: string;
  password?: string;
  company?: string;
  role: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String },
  password: {
    type: String,
    required: true,
  },
  company: { type: String },
  role: {
    type: String,
    default: "distributor",
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// In development, always re-register the model so schema changes (e.g. new fields)
// are picked up after hot reloads. mongoose.models caches across reloads, causing
// Mongoose strict mode to silently strip fields added to the schema after first load.
if (process.env.NODE_ENV !== "production" && mongoose.models["User"]) {
  mongoose.deleteModel("User");
}

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
