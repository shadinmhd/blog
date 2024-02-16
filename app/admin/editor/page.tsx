"use client"
import { SegmentInterface } from "@/interface/post.interface"
import { useEffect, useState } from "react"
import { CldUploadButton } from "next-cloudinary"
import { ScrollArea } from "@/components/ui/scroll-area"
import api, { handleAxiosError } from "@/lib/api"
import { PlusIcon, SaveIcon, TrashIcon } from "lucide-react"
import { toast } from "sonner"
import NewSegment from "@/components/admin/editor/NewSegment"
import { useSearchParams } from "next/navigation"

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

const Editor = () => {

	const params = useSearchParams()
	const [id, setId] = useState<String>(params?.get("id") || "")
	const [title, setTitle] = useState("")
	const [titleErrorMessage, setTitleErrorMessage] = useState("")
	const [description, setDescription] = useState("")
	const [thumbnail, setThumbnail] = useState("")
	const [segments, setSegments] = useState<SegmentInterface[]>([])

	useEffect(() => {
		if (id)
			api.get(`/api/post/${id}`)
				.then(({ data }) => {
					setId(data.post._id)
					setDescription(data.post.description || "")
					setTitle(data.post.title)
					setSegments(data.post.segments || [])
					setThumbnail(data.post.thumbnail || "")
					console.log(data)
				})
				.catch((error) => {
					handleAxiosError(error)
				})
	}, [id])

	const save = () => {
		console.log("saving")
		if (!id) return
		if (!title) {
			setTitleErrorMessage("this field be empty")
			return
		}

		api.put("/api/post", { id, title, description, segments, thumbnail })
			.then(({ data }) => {
				if (data.success) {
					toast.success(data.message)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}

	const createPost = () => {
		if (id) return
		if (!title) {
			setTitleErrorMessage("this field cannot be empty")
			return
		}

		api.post("/api/post", { title, description, segments, thumbnail })
			.then(({ data }) => {
				if (data.success) {
					setId(data.post._id)
					toast.success(data.message)
				} else {
					toast.error(data.message)
				}
			})
			.catch((error) => {
				handleAxiosError(error)
			})
	}

	const titleOnChange = (title: string) => {
		setTitle(title)
		api.post("/api/post/checktitle", { title })
			.then(({ data }) => {
				if (data.success) {
					setTitleErrorMessage("")
				} else {
					setTitleErrorMessage(data.message)
				}
			}).catch((error) => {
				handleAxiosError(error)
			})
	}

	const deleteThumbnail = () => {
		setThumbnail("")
	}

	const addSegment = (type: "paragraph" | "image" | "title" | "code") => {
		console.log(type)
		setSegments((prev) => [...prev, { type, content: "" }])
	}

	return (
		<div className="flex flex-col gap-5 items-start justify-start h-full w-full px-10">
			<div className="flex items-center justify-start gap-5 w-full py-10">
				<input
					value={title}
					onChange={(e) => titleOnChange(e.target.value)}
					type="text"
					placeholder={titleErrorMessage || "Title"}
					className={`w-full p-2 bg-black border-2 ${titleErrorMessage && "border-red-500 placeholder:text-red-500"} outline-none`}
				/>
				<div className="flex gap-5 items-center justify-end w-full">
					<SaveIcon className="cursor-pointer" onClick={() => id != "" ? save() : createPost()} />
					<TrashIcon className="text-red-500 cursor-pointer" />
				</div>
			</div>
			<ScrollArea className="w-full h-full">
				<div className="flex flex-col gap-5 items-center justify-center w-full">
					{
						thumbnail ?
							<div className="flex flex-col items-center justify-center">
								<img className="w-full" src={thumbnail} alt="thumbnail" />
								<div className="flex items-center justify-start w-full py-2">
									<button onClick={() => deleteThumbnail()} className="bg-red-500 text-black px-3 py-1 font-bold">
										delete
									</button>
								</div>
							</div>
							:
							<CldUploadButton
								uploadPreset={CLOUDINARY_UPLOAD_PRESET}
								onSuccess={(e: any) => setThumbnail(e.info?.secure_url)}
								className="bg-white text-black px-3 py-1 font-bold w-full"
							>
								Upload thumbnail
							</CldUploadButton>
					}
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Enter a quick description here"
						className="w-full bg-black p-2 outline-none border-2"
						rows={10}
					/>
					{
						segments.map((e) => {
							if (e.type == "paragraph")
								return (
									<div className="w-full">
										{e.content}
									</div>
								)
							if (e.type == "title")
								return (
									<p className="w-full text-3xl">{e.content}</p>
								)
							if (e.type == "image")
								return (
									<div>

									</div>
								)
							if (e.type == "code")
								return (
									<div>

									</div>
								)
						})
					}
					<div className="flex items-center justify-center outline-none w-full py-5">
						<NewSegment addSegment={addSegment}>
							<PlusIcon className="text-2xl text-green-500" />
						</NewSegment>
					</div>
				</div>
			</ScrollArea>
		</div>
	)
}

export default Editor
