"use client"
import { useState } from "react"
import { CldUploadButton } from "next-cloudinary"
import api, { handleAxiosError } from "@/lib/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { PenIcon, Image, ImageOff, Trash } from "lucide-react"
import { ScrollArea } from "@radix-ui/react-scroll-area"

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

const Editor = () => {

	const router = useRouter()
	const [title, setTitle] = useState("")
	const [titleErrorMessage, setTitleErrorMessage] = useState("")
	const [description, setDescription] = useState("")
	const [thumbnail, setThumbnail] = useState("")

	const createPost = () => {
		if (!title) {
			setTitleErrorMessage("this field cannot be empty")
			return
		}

		api.post("/api/post", { title, description, thumbnail })
			.then(({ data }) => {
				if (data.success) {
					toast.success(data.message)
					router.push(`/admin/editor/${data.post._id}`)
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

	return (
		<div className="flex flex-col justify-center h-full w-full p-10 overflow-hidden">
			<ScrollArea className="flex flex-col items-start gap-5 items-centre justify-center w-full h-full">
				<div className="flex flex-col items-center justify-center gap-5 w-full">
					<p className="text-4xl font-bold text-white">New project</p>
					<div className="flex items-center gap-1 w-full">
						<CldUploadButton
							uploadPreset={CLOUDINARY_UPLOAD_PRESET}
							onSuccess={(e: any) => setThumbnail(e.info?.secure_url)}
							className="flex items-center justify-center gap-2 bg-white text-black px-3 py-1 font-bold w-full"
						>
							<p className={thumbnail ? "" : `text-xl`}>{thumbnail ? thumbnail : "Upload thumbnail"}</p>
						</CldUploadButton>
						<button onClick={() => deleteThumbnail()} className="bg-red-500 text-black px-3 py-1 font-bold">
							<Trash className="text-black" />
						</button>
					</div>
					<input
						value={title}
						onChange={(e) => titleOnChange(e.target.value)}
						type="text"
						placeholder={titleErrorMessage || "Title"}
						className={`w-full p-2 bg-black border-2 ${titleErrorMessage && "border-red-500 placeholder:text-red-500"} outline-none`}
					/>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Enter a quick description here"
						className={`w-full bg-black p-2 outline-none border-2 text-white`}
						rows={10}
					/>
					<button onClick={createPost} className="flex gap-2 py-2 px-3 bg-white text-black font-bold">
						<p>Create new post</p>
						<PenIcon />
					</button>
				</div>
			</ScrollArea>
		</div>
	)
}

export default Editor
