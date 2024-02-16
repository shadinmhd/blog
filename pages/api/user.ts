import { serverErrorResponse } from "@/lib/apiResponses"
import authorize from "@/lib/authorize"
import connectDb from "@/lib/connectDb"
import UserModel from "@/model/user.model"
import { NextApiRequest, NextApiResponse } from "next"

connectDb()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == "OPTIONS") {
			res.status(200).end()
			return
		}

		if (req.method == "GET") {
			const id = authorize(req, res)
			if (!id) return

			const user = await UserModel.findOne({ _id: id }, { password: 0 })

			res.status(200).send({
				success: true,
				message: "user data fetched",
				user
			})
			return
		}

	} catch (error) {
		serverErrorResponse(res)
	}
}

export default handler
