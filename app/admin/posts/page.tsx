"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import PostInterface from "@/interface/post.interface"
import api from "@/lib/api"
import { isAxiosError } from "axios"
import { ImageIcon } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

const Posts = () => {

	const [posts, setPosts] = useState<PostInterface[]>([])

	const getData = async () => {
		try {
			const { data } = await api.get("/api/post")
			console.log(data)
			if (data.success) {
				setPosts(data.posts)
			}
		} catch (error) {
			if (isAxiosError(error))
				console.log("in catch", error.response)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<ScrollArea className="flex items-start h-full w-full">
			<div className="grid grid-cols-3 items-center justify-center h-full w-full">
				{
					posts.map((e, k) => (
						<Link key={k} href={`/admin/editor?id=${e._id}`} className="flex flex-col items-center justify-center border-2 border-white w-full h-full">
							{
								e.thumbnail ?
									<img className="w-full" src={e.thumbnail} />
									:
									<div className="flex items-center justify-center w-full h-full">
										<ImageIcon />
									</div>
							}
							<p>{e.title}</p>
						</Link>
					))
				}
			</div>
		</ScrollArea>
	)
}

export default Posts
