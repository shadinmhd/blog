import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import Link from "next/link"
import PostCard from '@/components/PostCard'

const Home = () => {
	const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).slice(0, 2)

	return (
		<div className="flex flex-col gap-5 items-center justify-center max-w-4xl py-8 pt-24 h-screen">
			<h1 className='dark:text-white text-5xl font-bold'>
				Welcome
			</h1>
			<h2></h2>
			<div className='flex flex-col gap-5 items-start'>
				<h2 className='dark:text-white font-semibold'>Latest Blogs:</h2>
				{posts.map((post, i) => (
					<PostCard key={i} post={post} />
				))}
			</div>
			<Link className='dark:text-white hover:underline transition-all duration-500' href={"/posts"}>
				More {"->"}
			</Link>
		</div>
	)
}

export default Home
