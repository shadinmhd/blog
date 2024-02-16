"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api, { handleAxiosError } from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"

const formSchema = z.object({
	email: z.string().email({ message: "enter a valid email" }),
	password: z.string().min(1, { message: "enter your password" })
})

type formType = z.infer<typeof formSchema>

const Login = () => {

	const { register, formState: { errors }, handleSubmit } = useForm<formType>({ resolver: zodResolver(formSchema) })
	const router = useRouter()

	const onSubmit = async (e: formType) => {
		try {
			const { data } = await api.post("/api/auth/login", e)
			if (data.success) {
				localStorage.setItem("token", data.token)
				router.push("/admin")
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className="flex flex-col items-center bg-black justify-start h-screen w-screen">
			<Navbar />
			<div className="flex flex-col items-center justify-center gap-10 pb-10 h-full">
				<p className="text-6xl font-bold text-white">Login</p>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("email")}
						placeholder="Email"
						type="text"
						className="px-3 py-1 text-black outline-none border border-white"
					/>
					{errors.email && <p className="text-red-500">{errors.email.message}</p>}
					<input
						{...register("password")}
						placeholder="Password"
						type="password"
						className="px-3 py-1 text-black outline-none border border-white"
					/>
					{errors.password && <p className="text-red-500">{errors.password.message}</p>}
					<button type="submit" className="bg-white text-black px-3 py-1 font-bold outline-none">
						Login
					</button>
					<Link href={"/register"} className="text-white font-bold">dont't have an account? register </Link>
				</form>
			</div>
		</div>
	)
}

export default Login
