import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
	_id: string;
	name: string;
	email?: string;
	person: string[];
};

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	persons: [{ type: mongoose.Types.ObjectId, ref: "Person" }]
}, { timestamps: true });
export const User = mongoose.model<UserDocument>("User", userSchema);

export async function initUser() {
	return new Promise((resolve, reject) => {
		const newUser = new User({ name: "Anonymous" });
		newUser
			.save()
			.then(resolve)
			.catch(reject);
	});
}

export async function getUserById(id: string) {
	return new Promise((resolve, reject) => {
		User.findById(id).exec().then(resolve).catch(reject);
	});
}

export async function getAllUsers() {
	return new Promise((resolve, reject) => {
		User
			.find()
			.limit(50)
			.exec()
			.then(resolve)
			.catch(reject);
	});
}

export async function updateUser(user: UserDocument) {
	return new Promise((resolve, reject) => {
		const { _id } = user;
		if (!_id) {
			reject("Missing user's id");
		}
		User
			.findOneAndUpdate({ _id }, { ...user },  { upsert: true })
			.exec()
			.then(resolve)
			.catch(reject);
	});
}

