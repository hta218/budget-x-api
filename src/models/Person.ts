import mongoose from "mongoose";

export type PersonDocument = mongoose.Document & {
    userId: string
    name: string
};

const personSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    name: String
}, { timestamps: true });

export async function saveType(person: PersonDocument) {
    return new Promise((resolve, reject) => {
        const newPerson = new Person(person)
        newPerson
            .save()
            .then(resolve)
            .catch(reject)
    })
}

export async function updateItem(person: PersonDocument) {
    return new Promise((resolve, reject) => {
        const { _id } = person;
        if (!_id) {
            reject("Missing person's id")
        }
        Person
            .findOneAndUpdate({ _id }, { upsert: true })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}

export async function deleteItem(_id: string) {
    return new Promise((resolve, reject) => {
        Person
            .findOneAndDelete({ _id })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}

export const Person = mongoose.model<PersonDocument>("Person", personSchema);
