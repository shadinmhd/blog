import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { FC, ReactNode } from "react"

interface Props {
	children: ReactNode,
	className?: string,
	addSegment: (type: "paragraph" | "title" | "image" | "code") => void
}

const NewSegment: FC<Props> = ({ children, className, addSegment }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn("outline-none", className)}>
				{children}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-black text-white">
				<DropdownMenuLabel>New Segment</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={() => addSegment("title")}>
						Title
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => addSegment("paragraph")}>
						Paragraph
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => addSegment("image")}>
						Image
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => addSegment("code")}>
						Code
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default NewSegment
