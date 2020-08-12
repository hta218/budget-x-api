import mongoose from "mongoose";

export type ItemDocument = mongoose.Document & {
    date: Date,
    type: string,
    amount: number,
    description: string,
    spendingType: string,
    person: string
};

const itemSchema = new mongoose.Schema({
    date: { type: Date, default: new Date() },
    type: String,
    amount: Number,
    description: String,
    spendingType: String,
    person: String
}, { timestamps: true });


export async function saveItem(item: ItemDocument) {
    return new Promise((resolve, reject) => {
        const newItem = { ...item }
        newItem
            .save()
            .then(resolve)
            .catch(reject)
    })
}
export const Item = mongoose.model<ItemDocument>("Item", itemSchema);
