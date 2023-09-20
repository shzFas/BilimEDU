import mongoose, { Document, Schema } from "mongoose";

export interface IUsers extends Document {
  email: string;
  passwordHash: string;
  fullName: string;
  telegram_id: string;
  avatarUrl: string;
  permission: Array<string>;
}

const usersSchema = new Schema<IUsers>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    telegram_id: {
      type: String,
      unique: true,
    },
    avatarUrl: String,
    permission: Array,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUsers>("Users", usersSchema);
