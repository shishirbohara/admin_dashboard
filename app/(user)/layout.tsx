import { NavLinks } from "@/components/Navbar/NavLinks";

export default function UserNav() {
    return (
        <div className="flex justify-center list-none py-5 gap-10 shadow-xl">
            <NavLinks href="/" label="Home" />
            <NavLinks href="/products" label="Products" />
            <NavLinks href="/orders" label="My Orders" />
        </div>
    )
}
