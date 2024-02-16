import { serverErrorResponse } from "@/lib/apiResponses"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "@/model/user.model"
import { NextApiRequest, NextApiResponse } from "next"
import connectDb from "@/lib/connectDb"

connectDb()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == "OPTIONS") {
			res.status(200).end()
			return
		}

		if (req.method != "POST") {
			res.status(404).end()
			return
		}

		const { email, password } = req.body

		if (!email || !password) {
			res.status(400).send({
				success: false,
				message: "please fill all fields"
			})
			return
		}

		const user = await UserModel.findOne({ email })
		if (!user) {
			res.status(400).send({
				success: false,
				message: "user not found"
			})
			return
		}

		const passCompare = bcrypt.compareSync(password, user.password!)
		if (!passCompare) {
			res.status(400).send({
				success: false,
				message: "incorrect username or password"
			})
			return
		}

		const payload = {
			id: user._id.toString(),
			admin: user.admin
		}
		const token = jwt.sign(payload, process.env.JWT_SECRET!)

		res.status(200).send({
			success: true,
			message: "login successfull",
			token
		})

	} catch (error) {
		console.log(error)
		serverErrorResponse(res)
	}
}

export default handler 
