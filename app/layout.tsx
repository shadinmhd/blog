import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import cn from "@/utils/cn";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Shadinmhd",
	description: "",
	icons: "/photo.png"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(inter.className, "flex flex-col items-center dark:bg-gray")}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
