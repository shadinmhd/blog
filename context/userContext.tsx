"use client"
import UserInterface from "@/interface/user.interface";
import api, { handleAxiosError } from "@/lib/api";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
	loggedIn: boolean,
	user: UserInterface
}

const userContext = createContext<Props>({
	loggedIn: false,
	user: {}
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [loggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState<UserInterface>({})

	useEffect(() => {
		if (localStorage.getItem("token")) {
			api.get("/api/user")
				.then(({ data }) => {
					if (data.success) {
						setUser(data.user)
					} else {
						toast.error(data.message)
					}
				})
				.catch((error) => {
					handleAxiosError(error)
				})
		}
	}, [])

	return (
		<userContext.Provider value={{ loggedIn, user }}>
			{children}
		</userContext.Provider>
	)
}

export const useUser = () => {
	return useContext(userContext)
}
