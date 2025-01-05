import Header from "@/app/admin/_components/Header";
import ProductForm from "../../_components/ProductForm";
import db from "@/db/db";

export default async function EditProduct({ params: { id } }: { params: { id: string } }) {
    const product = await db.product.findUnique({ where: { id } })
    return (
        <>
            <Header>Edit Products</Header>
            <ProductForm product={product} />
        </>
    )
}
