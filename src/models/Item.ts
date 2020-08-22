import mongoose, { mongo } from "mongoose";

export type ItemDocument = mongoose.Document & {
    userId: string,
    date: Date,
    budget: 'income' | 'expense',
    amount: number,
    description: string,
    type: string,
    person: string
};

const itemSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: new Date() },
    budget: String,
    amount: Number,
    description: String,
    type: { type: mongoose.Types.ObjectId, ref: 'Type' },
    person: String
}, { timestamps: true });


export async function saveItem(item: ItemDocument) {
    return new Promise((resolve, reject) => {
        const newItem = new Item(item)
        newItem
            .save()
            .then(resolve)
            .catch(reject)
    })
}

export async function updateItem(item: ItemDocument) {
    return new Promise((resolve, reject) => {
        const { _id } = item;
        if (!_id) {
            reject("Missing item's id")
        }
        Item
            .findOneAndUpdate({ _id }, { upsert: true })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}

export async function deleteItem(_id: string) {
    return new Promise((resolve, reject) => {
        Item
            .findOneAndDelete({ _id })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}
export const Item = mongoose.model<ItemDocument>("Item", itemSchema);
