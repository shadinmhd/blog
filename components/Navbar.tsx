import Link from "next/link"

const Navbar = () => {
	return (
		<header className="flex bg-white px-10 w-full py-5 items-center justify-between">
			<div className="flex items-center">
				<Link href="https://shadinmhd.in" className="font-extrabold text-2xl">
					Shadin
				</Link>
				<Link href="/" className="font-extrabold text-2xl">
					/Blog
				</Link>
			</div>
		</header>
	)
}

export default Navbar
