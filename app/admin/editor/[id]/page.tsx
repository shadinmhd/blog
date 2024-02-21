"use client"
import { useState, FC, useEffect } from "react"
import { CldUploadButton } from "next-cloudinary"
import { ScrollArea } from "@/components/ui/scroll-area"
import api, { handleAxiosError } from "@/lib/api"
import { Eye, EyeOff, PenIcon, SaveIcon, TrashIcon } from "lucide-react"
import MDeditor from "@uiw/react-md-editor"
import { toast } from "sonner"
import { Editor as TextEditor } from "primereact/editor"

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

interface Props {
	params: {
		id: string
	}
}

const Editor: FC<Props> = ({ params }) => {
	const [title, setTitle] = useState("")
	const [titleErrorMessage, setTitleErrorMessage] = useState("")
	const [description, setDescription] = useState("")
	const [thumbnail, setThumbnail] = useState("")
	const [content, setContet] = useState("")
	const [editing, setEditing] = useState(true)

	useEffect(() => {
		console.log(content)
	}, [content])

	useEffect(() => {
		if (params.id) {
			api.get(`/api/post/${params.id}`)
				.then(({ data }) => {
					if (data.success) {
						setTitle(data.post.title)
						setDescription(data.post.description)
						setThumbnail(data.post.content)
						setContet(data.post.content)
					} else {
						toast.error(data.message)
					}
				})
				.catch((error) => {
					handleAxiosError(error)
				})
		}
		if (!params?.id) {
			location.href = "/admin/posts"
		}
	}, [])


	const save = () => {
		console.log("saving")
		if (!params.id) return
		if (!title) {
			setTitleErrorMessage("this field be empty")
			return
		}
		console.log(content)

		api.put("/api/post", { id: params.id, title, description, content, thumbnail })
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
					{
						editing ?
							<Eye className="cursor-pointer" onClick={() => setEditing(false)} /> :
							<EyeOff className="cursor-pointer" onClick={() => setEditing(true)} />
					}
					<SaveIcon className="cursor-pointer" onClick={() => save()} />
					<TrashIcon className="text-red-500 cursor-pointer" />
					<PenIcon className="text-blue-500" />
				</div>
			</div>
			<ScrollArea className="w-full h-full text-black gap-5">
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
					{
						editing ? <textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter a quick description here"
							className={`w-full bg-black p-2 outline-none border-2 text-white`}
							rows={10}
						/> :
							<p className="w-full text-left text-white">{description}</p>
					}
					{

						editing ? <MDeditor
							className="w-full border-2 border-white"
							height={"auto"}
							value={content}
							hideToolbar={true}
							highlightEnable={true}
							preview={"edit"}
							onChange={(e) => e ? setContet(e) : setContet("")}
						/> :
							<MDeditor.Markdown
								className="w-full bg-black text-white"
								source={content}
								style={{
									whiteSpace: "pre-wrap",
									backgroundColor: "black",
									padding: "2px",
									color: "white"
								}}
							/>
					}
				</div>
			</ScrollArea>
		</div>
	)
}

export default Editor

