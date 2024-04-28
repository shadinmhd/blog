import Link from "next/link"
import { Moon } from "lucide-react"

const Navbar = () => {
	return (
		<header className="flex fixed top-0 left-0 bg-background border-b border-b-white/20 font-bold items-center py-5 justify-evenly w-full">
			<Link
				className="text-primary text-2xl"
				href={`/`}
			>
				shadinmhd
			</Link>
			<nav className="flex gap-5">
				<Link
					href={`/`}
					className="text-primary"
				>
					Home
				</Link>
				<Link
					href={`/posts`}
					className="text-primary"
				>
					Posts
				</Link>
				<Link
					href={`/about`}
					className="text-primary"
				>
					About
				</Link>
			</nav>
			<div>
				<Moon className="size-4 text-white" />
			</div>
		</header>
	)
}

export default Navbar
