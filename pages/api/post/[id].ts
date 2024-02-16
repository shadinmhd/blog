import { serverErrorResponse } from "@/lib/apiResponses"
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
			const { id } = req.query

			if (!id) {
				res.status(400).send({
					success: false,
					message: "no id provided"
				})
				return
			}

			const post = await PostModel.findOne({ _id: id })

			if (!post) {
				res.status(400).send({
					success: false,
					message: "no post found"
				})
				return
			}

			res.status(200).send({
				success: true,
				message: "post fetched",
				post
			})

			return
		}

	} catch (error) {
		console.log(error)
		serverErrorResponse(res)
	}
}

export default handler
