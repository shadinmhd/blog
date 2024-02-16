"use client"
import Sidebar from "@/components/admin/Sidebar"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

const Layout = ({ children }: { children: ReactNode }) => {

	const router = useRouter()

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			router.push("/login")
		}
	}, [])

	return (
		<div className="flex items-center justify-center h-screen w-screen bg-black text-white">
			<Sidebar />
			{children}
		</div>
	)
}

export default Layout
