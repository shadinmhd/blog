import Link from 'next/link'
import React from 'react'
import { Post } from '@/.contentlayer/generated'
import { parseISO, format } from 'date-fns'

const PostCard = ({ post }: { post: Post }) => {
	return (
		<Link href={post.url} className="group text-primary  rounded-lg transition-all duration-300 w-full">
			<h2 className="mb-1 dark:text-white text-xl group-hover:underline">
				{post.title}
			</h2>
			<p className="dark:text-white group-hover:underline">{post.description}</p>
			<time dateTime={post.date} className="dark:text-white mb-2 block text-xs text-gray-600">
				{format(parseISO(post.date), 'LLLL d, yyyy')}
			</time>
		</Link>

	)
}

export default PostCard
