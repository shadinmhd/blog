import { allPosts } from "@/.contentlayer/generated"
import { compareDesc, format, parseISO } from "date-fns"
import Link from "next/link"

const page = () => {
	const posts = allPosts.filter((e) => e.published).sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

	return (
		<div className="grid grid-cols-2 gap-5 items-center max-w-4xl py-8 pt-24">
			{posts.map((post, i) => (
				<Link key={i} href={post.url} className="text-primary hover:bg-white/15 p-2 rounded-lg transition-all duration-300">
					<h2 className="mb-1 text-xl">
						{post.title}
					</h2>
					<p className="text-primary">{post.description}</p>
					<time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
						{format(parseISO(post.date), 'LLLL d, yyyy')}
					</time>
				</Link>
			))}
		</div>

	)
}

export default page
