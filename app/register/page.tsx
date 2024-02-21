'use client'
import Navbar from '@/components/Navbar'
import api, { handleAxiosError } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
	username: z.string().min(4, { message: "username too short" }),
	email: z.string().email({ message: "Enter a valid email" }),
	password: z.string().min(4, { message: "password too short" }),
	confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password != confirmPassword) {
		ctx.addIssue({
			code: "custom",
			message: "Passwords don't match",
			path: ["confirmPassword"]
		})
	}
})

type formType = z.infer<typeof formSchema>

const Register = () => {

	const router = useRouter()
	const { register, formState: { errors }, handleSubmit } = useForm<formType>({ resolver: zodResolver(formSchema) })

	const onSubmit = async (e: formType) => {
		try {
			const { data } = await api.post("/api/auth/register", e)
			if (data.success) {
				router.push("/login")
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className="flex flex-col gap-10 items-center justify-center bg-black h-screen w-scree">
			<Navbar />
			<div className='flex flex-col items-center justify-center pb-10 gap-10 h-full'>
				<p className='text-6xl font-bold text-white'>Register</p>
				<form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)} >
					<input
						{...register("username")}
						placeholder='Username'
						type="text"
						className='px-3 py-1 text-black outline-none border border-white'
					/>
					{errors.username && <p className='text-red-500'>{errors.username.message}</p>}
					<input
						{...register("email")}
						placeholder='Email'
						type="text"
						className='px-3 py-1 text-black outline-none border border-white'
					/>
					{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
					<input
						{...register("password")}
						placeholder='Password'
						type="password"
						className='px-3 py-1 text-black outline-none border border-white'
					/>
					{errors.password && <p className='text-red-500'>{errors.password.message}</p>}
					<input
						{...register("confirmPassword")}
						placeholder='Confirm password'
						type="password"
						className='px-3 py-1 text-black outline-none border border-white'
					/>
					{errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
					<button disabled={true} type='submit' className='bg-white line-through text-black font-bold px-3 py-1'>
						Register
					</button>
					<p className='text-red-500 font-bold'>user registration is under development</p>
					<Link href={"/login"} className="text-white font-bold">allready have an account? login</Link>
				</form>
			</div>
		</div>
	)
}

export default Register
