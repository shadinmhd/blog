import { HomeIcon, PersonIcon, Pencil1Icon, EnvelopeClosedIcon, FileTextIcon, GearIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const Sidebar = () => {
	return (
		<div className="flex gap-5 bg-black justify-center px-5 flex-col h-full">
			<Link href={"/admin"}>
				<HomeIcon width="30px" height='30px' color="white" />
			</Link>
			<Link href={"/admin/editor"}>
				<Pencil1Icon width="30px" height='30px' color="white" />
			</Link>
			<Link href={"/admin/posts"}>
				<FileTextIcon width="30px" height='30px' color="white" />
			</Link>
			<Link href={"/admin/users"}>
				<PersonIcon width="30px" height='30px' color="white" />
			</Link>
			<Link href={"/admin/subscribers"}>
				<EnvelopeClosedIcon width="30px" height='30px' color="white" />
			</Link>
			<Link href={"/admin/settings"}>
				<GearIcon width="30px" height='30px' color="white" />
			</Link>
		</div>
	)
}

export default Sidebar

