import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import "./style.css"

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
	const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
	if (!post) notFound()
	return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
	const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
	if (!post) notFound()

	return (
		<article className="mx-auto flex flex-col items-start font-semibold text-lg dark:text-white max-w-2xl py-8 pt-24">
			<div className="mb-8 text-start">
				<h1 className="text-4xl font-bold">{post.title}</h1>
				<time dateTime={post.date} className="mb-1 text-xs text-gray-600">
					{format(parseISO(post.date), 'LLLL d, yyyy')}
				</time>
			</div>
			<div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />
		</article>
	)
}

export default PostLayout
