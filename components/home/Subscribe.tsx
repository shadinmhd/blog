"use client"
import { subscribe } from "@/lib/subscription"
import { FormEvent, useState } from "react"

const Subscribe = () => {

	const [email, setEmail] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
			await subscribe(email)
		}
		else {
			setErrorMessage("enter a valid email")
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<form onSubmit={onSubmit} className="flex gap-2 bg-white rounded-lg p-1">
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder="Email"
					className="px-6 py-3 rounded-lg bg-black text-white"
				/>
				<button className="font-bold bg-white text-black px-3 py-1 rounded-lg">
					Subscribe
				</button>
			</form>
			{
				errorMessage &&
				<p className="text-red-500">{errorMessage}</p>
			}
		</div>
	)
}

export default Subscribe
