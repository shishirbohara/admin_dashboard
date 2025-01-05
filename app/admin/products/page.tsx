import { Button } from "@/components/ui/button";
import Header from "../_components/Header";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/Actions";

export default function AdminProducts() {
  return (
    <>
      <div className="flex justify-between mx-10">
        <Header>Products</Header>
        <Button className="my-3">
          <Link href={'/admin/products/new'}>Add Product</Link>
        </Button>

      </div>
      <ProductTable />
    </>
  )
}

async function ProductTable() {

  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      isAvailableForPurchase: true,
    }
  })

  if (products.length === 0) return <p>Products not found</p>
  return <Table>

    <TableHeader>
      <TableRow>
        <TableHead className="w-0"><span className="sr-only">Available Products</span></TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Description</TableHead>
        <TableHead className="w-0"><span className="sr-only">Actions</span></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map(product => (
        <TableRow key={product.id}>
          <TableCell>
            {product.isAvailableForPurchase ? (
              <>
                <span className="sr-only">Available</span>
                <CheckCircle2 className="text-green-500" />
              </>
            ) :
              (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="text-red-500" />
                </>
              )}
          </TableCell>
          <TableCell>{product.name}</TableCell>
          <TableCell>Rs {product.price}</TableCell>
          <TableCell>{product.description}</TableCell>
          <TableCell>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
                <span className="sr-only">Actions</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="bg-gray-200 p-2 rounded space-y-1 shadow-lg">
                  <DropdownMenuItem>
                    <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem id={product.id}
                    isAvailableForPurchase={product.isAvailableForPurchase} />
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem id={product.id} />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
}