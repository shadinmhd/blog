import { serverErrorResponse } from "@/lib/apiResponses"
import { adminAuthorize } from "@/lib/authorize"
import connectDb from "@/lib/connectDb"
import PostModel from "@/model/post.model"
import { NextApiRequest, NextApiResponse } from "next"

connectDb()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == "OPTIONS") {
			res.status(200).end()
			return
		}

		if (req.method == "GET") {
			const posts = await PostModel.find({})

			res.status(200).send({
				success: true,
				message: "posts fetched",
				posts: posts || []
			})

			console.log("from api", posts)
			return
		}

		if (req.method == "POST") {
			const user = adminAuthorize(req, res)
			if (!user) return

			const { title, description, thumbnail } = req.body

			if (!title) {
				res.status(400).send({
					success: false,
					message: "no title is provded"
				})
				return
			}

			const post = await new PostModel({
				title,
				description,
				thumbnail
			}).save()

			res.status(200).send({
				success: true,
				message: "post created",
				post
			})

			return
		}

		if (req.method == "PUT") {
			const user = adminAuthorize(req, res)
			if (!user) return

			const { id, title, description, content, thumbnail } = req.body

			if (!id) {
				res.status(400).send({
					success: false,
					message: "id not provided"
				})
				return
			}

			await PostModel.updateOne({ _id: id }, { $set: { title, thumbnail, description, content } })

			res.status(200).send({
				success: true,
				message: "post saved"
			})

			return
		}

		res.status(404).end()
	} catch (error) {
		console.log(error)
		serverErrorResponse(res)
	}
}
export default handler
