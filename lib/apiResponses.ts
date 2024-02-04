import { NextApiResponse } from "next";

export const serverErrorResponse = (res: NextApiResponse) => {
	res.status(500).send({
		success: false,
		message: "server error"
	})
}
