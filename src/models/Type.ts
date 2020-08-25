import mongoose from "mongoose";

export type TypeDocument = mongoose.Document & {
    userId: string
    name: string
    description: string
};

const typeSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    name: String,
    description: String
}, { timestamps: true });

export async function getTypesByUser(userId: string) {
    return new Promise((resolve, reject) => {
        Type
            .find({ userId })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}

export async function saveType(type: any) {
    return new Promise((resolve, reject) => {
        const newType = new Type(type)
        newType
            .save()
            .then(resolve)
            .catch(reject)
    })
}

export async function updateType(type: TypeDocument) {
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

export async function deleteType(_id: string) {
    return new Promise((resolve, reject) => {
        Type
            .findOneAndDelete({ _id })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}

export const Type = mongoose.model<TypeDocument>("Type", typeSchema);
