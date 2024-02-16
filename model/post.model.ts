import PostInterface, { SegmentInterface } from "@/interface/post.interface";
import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema<SegmentInterface>({
	type: {
		type: String,
		required: true,
		enum: ["paragraph", "title", "image", "code"]
	},
	content: {
		type: String,
		required: true
	}
})

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
	segments: {
		type: [segmentSchema],
		default: []
	},
	thumbnail: {
		type: String
	}
}, { timestamps: true })

const PostModel = mongoose.models.Post as mongoose.Model<PostInterface> || mongoose.model("Post", postSchema)
export default PostModel
