export interface SegmentInterface {
	type: "title" | "paragraph" | "code" | "image",
	content: string
}

interface PostInterface {
	_id?: string,
	title?: string,
	description?: string,
	thumbnail?: string,
	segments?: SegmentInterface[],
	createdAt?: Date,
	updatedAt?: Date
}

export default PostInterface

