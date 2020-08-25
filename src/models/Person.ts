import mongoose from "mongoose";

export type PersonDocument = mongoose.Document & {
    userId: string
    name: string
};

const personSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    name: String
}, { timestamps: true });

export async function getPersonsByUser(userId: string) {
    return new Promise((resolve, reject) => {
        Person
            .find({ userId })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}

export async function savePerson(person: any) {
    return new Promise((resolve, reject) => {
        const newPerson = new Person(person)
        newPerson
            .save()
            .then(resolve)
            .catch(reject)
    })
}

export async function updatePerson(person: PersonDocument) {
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

export async function deletePerson(_id: string) {
    return new Promise((resolve, reject) => {
        Person
            .findOneAndDelete({ _id })
            .exec()
            .then(resolve)
            .catch(reject)
    })
}

export const Person = mongoose.model<PersonDocument>("Person", personSchema);
