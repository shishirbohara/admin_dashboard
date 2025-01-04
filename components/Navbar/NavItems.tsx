import { NavLinks } from "./NavLinks";

export default function NavItems() {
    return (
        <div className="list-none space-y-3 shadow-xl px-10 py-10 min-h-screen">
            <NavLinks href="/admin" label="Dashboard" />
            <NavLinks href="/admin/products" label="Products" />
            <NavLinks href="/admin/customers" label="Customers" />
            <NavLinks href="/admin/orders" label="Orders" />
        </div>
    );
}