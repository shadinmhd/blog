import PostInterface from "@/interface/post.interface";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema<PostInterface>({
	title: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	content: {
		type: String,
		default: ""
	},
	thumbnail: {
		type: String
	}
}, { timestamps: true })

const PostModel = mongoose.models.Post as mongoose.Model<PostInterface> || mongoose.model("Post", postSchema)
export default PostModel
