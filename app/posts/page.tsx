import { allPosts } from "@/.contentlayer/generated"
import PostCard from "@/components/PostCard"
import { compareDesc } from "date-fns"

const page = () => {
	const posts = allPosts.filter((e) => e.published).sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

	return (
		<div className="grid grid-cols-2 gap-5 items-center max-w-4xl py-8 pt-24">
			{posts.map((post, i) => (
				<PostCard key={i} post={post} />
			))}
		</div>

	)
}

export default page
