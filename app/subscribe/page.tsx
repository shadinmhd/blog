"use client"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { subscribe } from "@/lib/subscription"
import { emailRegex } from "@/lib/regexes"

const Subscribe = () => {
	const [email, setEmail] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (email.match(emailRegex)) {
			await subscribe(email)
		}
		else {
			setErrorMessage("enter a valid email")
		}
	}

	return (
		<div className="flex flex-col bg-black h-screen w-screen items-center justify-center">
			<Navbar />
			<div className="flex flex-col gap-10 items-center justify-center h-full w-full">
				<p className="text-6xl text-white font-extrabold">
					Subscribe
				</p>
				<form onSubmit={onSubmit} className="flex flex-col gap-2 items-center justify-center">
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						placeholder="Email"
						className="px-3 py-1 rounded-lg text-black outline-none"
					/>
					{
						errorMessage &&
						<p className="text-red-500">{errorMessage}</p>
					}
					<button type="submit" className="bg-white text-black font-bold px-3 py-1 rounded-lg w-full">
						subscribe
					</button>
					<Link href="/unsubscribe" className="font-bold text-white">
						looking to unsubscribe ?
					</Link>
				</form>
			</div>
		</div>
	)
}

export default Subscribe
