import { isAxiosError } from "axios"
import { toast } from "sonner"
import api from "./api"

export const subscribe = async (email: string) => {
	try {
		const { data } = await api.post("/api/subscribe", { email })
		if (data.success) {
			toast.success(data.message)
		} else {
			toast.error(data.message)
		}
	} catch (error) {
		if (isAxiosError(error))
			if (error.response?.data.message)
				toast.error(error.response.data.message)
			else
				toast.error(error.message)
		else
			toast.error("somethin went wrong")
		console.log(error)
	}
}

export const unsubscribe = async (email: string) => {
	try {
		const { data } = await api.delete(`/api/subscribe?email=${email}`)
		if (data.success)
			toast.success(data.message)
		else
			toast.error(data.message)
	} catch (error) {
		if (isAxiosError(error))
			if (error.response?.data.message)
				toast.error(error.response.data.message)
			else
				toast.error(error.message)
		else
			toast.error("somethin went wrong")
		console.log(error)
	}
}
