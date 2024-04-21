import Navbar from "@/components/Navbar"

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
						<p className="text-xl text-center text-orange-500 opacity-80">
							I am still in the process of developing this website <br />
							So i don't have any blogs posted yet
						</p>
					</div>
				</div>
			</div>
		</div >
	)
}

export default Home
