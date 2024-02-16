import { serverErrorResponse } from "@/lib/apiResponses"
import bcrypt from "bcrypt"
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

		const { username, email, password } = req.body

		if (!username || !email || !password) {
			res.status(400).send({
				success: false,
				message: "please fill all fields"
			})
			return
		}

		const emailSearch = await UserModel.findOne({ email })

		if (emailSearch) {
			res.status(400).send({
				success: false,
				message: "email all ready use"
			})
			return
		}

		const userNameSearch = await UserModel.findOne({ username })

		if (userNameSearch) {
			res.status(400).send({
				success: false,
				message: "username all read used"
			})
			return
		}

		const salt = bcrypt.genSaltSync(10)
		const hashedPassword = bcrypt.hashSync(password, salt)
		const user = await new UserModel({ username, email, password: hashedPassword }).save()

		res.status(200).send({
			success: true,
			message: "user created successfully",
			user
		})

	} catch (error) {
		console.log(error)

		serverErrorResponse(res)
	}
}

export default handler
