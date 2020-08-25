import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    _id: string
    name: string
    email?: string
    person: string[]
};

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: false },
    persons: [{ type: mongoose.Types.ObjectId, ref: "Person" }]
}, { timestamps: true });

export async function initUser() {
    return new Promise((resolve, reject) => {
        const newUser = new User({ name: "Anonymous" })
        newUser
            .save()
            .then(resolve)
            .catch(reject)
    });
}

export async function updateUser(user: UserDocument) {
    return new Promise((resolve, reject) => {
        const { _id } = user;
        if (!_id) {
            reject("Missing user's id")
        }
        User
            .findOneAndUpdate({ _id }, { upsert: true })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}

export const User = mongoose.model<UserDocument>("User", userSchema);
