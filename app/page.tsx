import ProductCard from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { Product } from "@prisma/client"
import Link from "next/link"

function getPopularProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: 'desc' } },
    take: 4
  })
}

function getNewProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: 'desc' },
    take: 4
  })
}

export default function page() {
  return (
    <div>
      <ProductGridSection title="Most Popular" productFetcher={getPopularProducts} />
      <ProductGridSection title="New Products" productFetcher={getNewProducts} />

    </div>
  )
}

type ProductGridSectionProps = {
  productFetcher: () => Promise<Product[]>;
  title: string;
}


function ProductGridSection({ productFetcher, title }: ProductGridSectionProps) {
  return (
    <div>
      <div className="py-5 px-20 flex gap-10">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>
        <Link href={'/products'}>
          <Button>View All</Button>
        </Link>
      </div>
      <div>
        <ProductCard/>
      </div>
    </div>
  )
}
