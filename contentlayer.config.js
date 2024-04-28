import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
	name: 'Post',
	filePathPattern: `**/*.md`,
	fields: {
		title: {
			type: 'string',
			required: true
		},
		date: {
			type: 'date',
			required: true
		},
		published: {
			type: "boolean",
			default: false
		},
		description: {
			type: "string",
			required: true
		}
	},
	computedFields: {
		url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
	},
}))

export default makeSource({
	contentDirPath: 'posts',
	documentTypes: [Post],
	markdown: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeAutolinkHeadings,
			rehypeSlug,
			rehypePrettyCode
		]
	}
})
