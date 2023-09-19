import mongoose, { Document, Schema } from "mongoose";

interface IUsers extends Document {
    name: string;
    surname: string;
    permission: Array<string>;
};

const usersSchema = new Schema<IUsers>({
    name: String,
    surname: String,
    permission: Array,
});

export const Users = mongoose.model<IUsers>("Users", usersSchema);