import Navbar from "@/components/Navbar"
import Subscribe from "@/components/home/Subscribe"

const Home = () => {

	return (
		<div className="flex flex-col overflow-x-hidden bg-black">
			<div className="flex bg-black h-screen w-screen flex-col items-center justify-center">
				<Navbar />
				<div className="flex flex-col text-white font-extrabold gap-5 items-center justify-center h-full w-full">
					<div className="flex flex-col items-center justify-center gap-4">
						<p className="text-8xl">
							Blog
						</p>
						<p className="text-xl opacity-80">
							Welcome to my personal blog, here i share my experience and perspective on all thing tech
						</p>
					</div>
					<Subscribe />
				</div>
			</div>
			<div className="flex bg-black h-screen w-screen flex-col items-center justify-center">

			</div>
		</div>
	)
}

export default Home
