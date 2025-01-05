'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"
import addProduct, { editProduct } from "../../_actions/productAction"

export default function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useActionState(product == null ? addProduct : editProduct.bind(null, product.id), {})
  const [price, setPrice] = useState<number | undefined>(product?.price)
  return (
    <>
      <form action={action} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required defaultValue={product?.name || ""} />
          {error.name && <div className="text-red-500">{error.name}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input type="number" id="price" name="price" required defaultValue={product?.price || ""} onChange={(e) => setPrice(Number(e.target.value) || undefined)} />
          {error.price && <div className="text-red-500">{error.price}</div>}
        </div>
        <div className="text-muted-foreground">
          Rs {price || 0}

        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required defaultValue={product?.description || ""} />
          {error.description && <div className="text-red-500">{error.description}</div>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" required={product == null} />
          {product != null && (
            <div className="text-muted-foreground">{product.filePath}</div>
          )}
          {error.file && <div className="text-red-500">{error.file}</div>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" name="image" required={product == null} />
          {product != null && (
            <Image src={product.imagePath} height={200} width={100} alt="product" />
          )}
          {error.image && <div className="text-red-500">{error.image}</div>}
        </div>
        <SubmitButton />
      </form>
    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>{pending ? "Saving Product..." : "Save Product"}</Button>
  )

}
