import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const api = axios.create({})

api.interceptors.request.use((request) => {
	if (localStorage.getItem("token")) {
		request.headers.Authorization = localStorage.getItem("token")
	}
	return request
})

api.interceptors.response.use(
	(e) => e,
	(error) => {
		if (isAxiosError(error)) {

			if (error.response?.data.error == "notadmin") {
				location.assign("/")
				return
			}

			if (error.response?.data.error == "unauthorized") {
				localStorage.removeItem("token")
				location.assign("/login")
				return
			}

		} else {
			return Promise.reject(error)
		}
	}
)

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
