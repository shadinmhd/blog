import { serverErrorResponse } from "@/lib/apiResponses"
import connectDb from "@/lib/connectDb"
import SubscriberModel from "@/model/subscriber.model"
import { NextApiRequest, NextApiResponse } from "next"

connectDb()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == "OPTIONS") {
			res.status(200).end()
			return
		}

		if (req.method == "POST") {
			const { email } = req.body

			if (!email) {
				res.status(400).send({
					success: false,
					message: "please fill all fields"
				})
				return
			}

			const subscription = await new SubscriberModel({ email }).save()
			res.status(200).send({
				success: true,
				message: "subscribed successfully!"
			})
			return
		}

		if (req.method == "DELETE") {
			const { email } = req.query
			if (!email) {
				res.status(400).send({
					success: false,
					message: "email not provided"
				})
				return
			}

			const subscription = await SubscriberModel.findOne({ email })

			if (!subscription) {
				res.status(400).send({
					success: false,
					message: "this email was not used to subscribe before"
				})
				return
			}

			await SubscriberModel.deleteOne({ email })
			res.status(200).send({
				success: true,
				message: "you are unsubscribed"
			})
			return
		}

	} catch (error) {
		serverErrorResponse(res)
	}
}

export default handler
