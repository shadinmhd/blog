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

		if (req.method == "POST") {

			const { title } = req.body

			if (!title) {
				res.status(200).send({
					success: false,
					message: "no title provded"
				})
				return
			}

			const post = await PostModel.findOne({ title })

			if (post) {
				res.status(200).send({
					success: false,
					message: "title allready used"
				})
				return
			}

			res.status(200).send({
				success: true,
				message: "title is not bieng used"
			})
			return
		}

		res.status(400).end()

	} catch (error) {
		console.log(error)
		serverErrorResponse(res)
	}
}

export default handler
