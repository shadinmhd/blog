import UserInterface from "@/interface/user.interface";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<UserInterface>({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

const UserModel = mongoose.models.User as mongoose.Model<UserInterface> || mongoose.model("User", userSchema)
export default UserModel
