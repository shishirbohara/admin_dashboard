'use client'
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailable } from "../../_actions/productAction";
import { useRouter } from "next/navigation";


export function ActiveToggleDropdownItem({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return <DropdownMenuItem
        disabled={isPending}
        onClick={() => {
            startTransition(async () => {
                await toggleProductAvailable(id, !isAvailableForPurchase)
                router.refresh()
            })
        }}>
        {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>

}

export function DeleteDropdownItem({ id }:
    { id: string }) {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem
        onClick={() => {
            startTransition(async () => {
                await deleteProduct(id)
                router.refresh()
            })
        }} className="text-red-500">
        Delete
    </DropdownMenuItem>

}
