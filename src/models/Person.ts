import mongoose from "mongoose";

export type PersonDocument = mongoose.Document & {
    name: string
    email: string
};

const personSchema = new mongoose.Schema({
    name: String,
    email: String
}, { timestamps: true });


export const Item = mongoose.model<PersonDocument>("Person", personSchema);
