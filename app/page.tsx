import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from "date-fns"
import Link from "next/link"

const Home = () => {
	const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).slice(0, 2)

	return (
		<div className="flex flex-col gap-5 items-center justify-center max-w-4xl py-8 pt-24 h-screen">
			<h1 className='text-primary text-5xl font-bold'>
				Welcome
			</h1>
			<h2></h2>
			<div className='flex flex-col gap-5 items-start'>
				<h2>Latest Blogs</h2>
				{posts.map((post, i) => (
					<Link key={i} href={post.url} className="text-primary hover:bg-white/15 p-2 rounded-lg transition-all duration-300 w-full">
						<h3 className="mb-1 text-xl">
							{post.title}
						</h3>
						<p className="text-primary">{post.description}</p>
						<time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
							{format(parseISO(post.date), 'LLLL d, yyyy')}
						</time>
					</Link>
				))}
			</div>
			<Link className='text-primary hover:underline transition-all duration-500' href={"/posts"}>
				More {"->"}
			</Link>
		</div>
	)
}

export default Home
