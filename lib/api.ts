import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const api = axios.create({})

export const handleAxiosError = (error: any) => {
	if (isAxiosError(error))
		if (error.response?.data.message)
			toast.error(error.response.data.message)
		else
			toast.error(error.message)
	else
		toast.error("something went wrong")
	console.log(error)
}

export default api
