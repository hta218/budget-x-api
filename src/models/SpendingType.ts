import mongoose from "mongoose";

export type SpendingTypeDocument = mongoose.Document & {
    name: string
    description: string
};

const spendingTypeSchema = new mongoose.Schema({
    name: String,
    description: String
}, { timestamps: true });


export const Item = mongoose.model<SpendingTypeDocument>("SpendingType", spendingTypeSchema);
