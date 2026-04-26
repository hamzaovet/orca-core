import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILicense extends Document {
  customerName: string;
  softwareType: string;
  serialKey: string;
  generatedBy: string;
  createdAt: Date;
}

const LicenseSchema: Schema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  softwareType: {
    type: String,
    required: true,
  },
  serialKey: {
    type: String,
    required: true,
    unique: true,
  },
  generatedBy: {
    type: String,
    default: "Admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const License: Model<ILicense> = mongoose.models.License || mongoose.model<ILicense>("License", LicenseSchema);
export default License;
