"use client"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import { FormEvent, useState } from "react"

const Unsubscribe = () => {
	const [email, setEmail] = useState("")

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<div className="flex flex-col bg-black pb-10 h-screen w-screen items-center justify-center">
			<Navbar />
			<div className="flex flex-col gap-10 items-center justify-center h-full w-full">
				<p className="text-6xl text-white font-extrabold">
					Un subscribe
				</p>
				<form className="flex flex-col gap-2 items-center justify-center">
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						placeholder="Email"
						className="px-3 py-1 rounded-lg text-black outline-none"
					/>
					<button type="submit" className="bg-white text-black font-bold px-3 py-1 rounded-lg w-full">
						Un subscribe
					</button>
					<Link href="/subscribe" className="text-white font-bold">
						Looking to subscribe ?
					</Link>
				</form>
			</div>
		</div>
	)
}

export default Unsubscribe
