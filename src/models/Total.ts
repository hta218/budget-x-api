import mongoose from "mongoose";

export type TotalDocument = mongoose.Document & {
    userId: string,
    month: string,
    income: number,
    expense: number,
    saved: number,
    note: string
};

const totalSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    month: String,
    income: Number,
    expense: Number,
    saved: Number,
    note: String,
}, { timestamps: true });


export const Total = mongoose.model<TotalDocument>("Total", totalSchema);
