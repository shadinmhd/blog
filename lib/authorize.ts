import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'

export const userAuthorize = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.headers.authorization) {
		const id = jwt.verify(req.headers.authorization, process.env.JWT_SECRET!) as { id: string, admin: boolean }
		return id
	} else {
		res.status(401).send({
			success: false,
			message: "you are unathorized",
			error: "unauthorized"
		})
	}
}

export const adminAuthorize = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.headers.authorization) {
		const payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET!) as { id: string, admin: boolean }

		if (payload.admin) {
			return payload.id
		}

		res.status(401).send({
			success: false,
			message: "you are not authorized",
			error: "notadmin"
		})
	} else {
		res.status(401).send({
			success: false,
			message: "you are unathorized",
			error: "notadmin"
		})
	}
}
