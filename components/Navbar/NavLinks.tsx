import Link from "next/link";

interface NavLinkProps {
    href: string;
    label: string;
    className?: string;
}

export const NavLinks = ({ href, label, className }: NavLinkProps) => (
    <li>
        <Link href={href} className={`text-xl hover:bg-blue-500 rounded hover:text-white px-1 py-2 ${className}`}>
            {label}</Link>
    </li>
)