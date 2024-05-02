"use client"
import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

type Theme = "dark" | "light"

const Navbar = () => {
	const [theme, setTheme] = useState<Theme>("dark")

	useEffect(() => {
		let selectedTheme = localStorage.getItem("theme")
		if (isValidTheme(selectedTheme)) {
			setTheme(selectedTheme)
			return
		} else {
			localStorage.removeItem("theme")
		}

		let systemTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"
		setTheme(systemTheme)
	}, [])

	const isValidTheme = (value: string | null): value is Theme => {
		return (value === "light" || value === "dark")
	}

	useEffect(() => {
		if (theme == "dark") {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	}, [theme])

	return (
		<header className="flex fixed top-0 left-0 dark:bg-gray  border-b dark:border-b-white/20 font-bold items-center py-5 justify-evenly w-full">
			<Link
				className="dark:text-white text-2xl hover:underline"
				href={`/`}
			>
				shadinmhd
			</Link>
			<nav className="flex gap-5">
				<Link
					href={`/`}
					className="dark:text-white hover:underline"
				>
					Home
				</Link>
				<Link
					href={`/posts`}
					className="dark:text-white hover:underline"
				>
					Posts
				</Link>
				<Link
					href={`/about`}
					className="dark:text-white hover:underline"
				>
					About
				</Link>
			</nav>
			{
				theme == "dark" ?
					<Moon onClick={() => { setTheme("light") }} className="size-4 text-white cursor-pointer" /> :
					<Sun onClick={() => { setTheme("dark") }} className="size-4 text-black cursor-pointer" />
			}
		</header>
	)
}

export default Navbar
