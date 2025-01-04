import { Loader2 } from "lucide-react";


export default function loading() {
    return (
        <div className="flex justify-center">
            <Loader2 className="size-20 animate-spin" />
        </div>
    )
}
