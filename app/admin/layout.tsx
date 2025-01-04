import NavItems from "@/components/Navbar/NavItems";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex gap-10 px-20 py-5 w-full">
            <NavItems />
            <div className="py-5 flex-grow">{children}</div>
        </div>
    )
}
