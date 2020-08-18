import mongoose from "mongoose";

export type TypeDocument = mongoose.Document & {
    name: string
    description: string
};

const typeSchema = new mongoose.Schema({
    name: String,
    description: String
}, { timestamps: true });

export async function saveType(type: TypeDocument) {
    return new Promise((resolve, reject) => {
        const newType = new Type(type)
        newType
            .save()
            .then(resolve)
            .catch(reject)
    })
}

export async function updateItem(type: TypeDocument) {
    return new Promise((resolve, reject) => {
        const { _id } = type;
        if (!_id) {
            reject("Missing Type's id")
        }
        Type
            .findOneAndUpdate({ _id }, { upsert: true })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}

export async function deleteItem(_id: string) {
    return new Promise((resolve, reject) => {
        Type
            .findOneAndDelete({ _id })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}

export const Type = mongoose.model<TypeDocument>("Type", typeSchema);
