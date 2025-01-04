import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaid: true },
    _count: true
  })
  await loader(1000)

  return {
    amount: data._sum.pricePaid || 0,
    numberOfSales: data._count
  }

}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaid: true }
    })
  ])

  return {
    userCount,
    averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaid || 0) / userCount
  }
}

async function getProductData() {
  const [InStockProducts, NotInStockProducts] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } })
  ])

  return {
    InStockProducts,
    NotInStockProducts
  }

}

function loader(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default async function AdminDash() {

  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData()
  ])


  return (
    <div className="w-full space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Sales</CardTitle>
          <CardDescription>{salesData.numberOfSales} average sales</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Rs {salesData.amount}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>{userData.userCount} users</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{userData.averageValuePerUser} average price paid per person</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>{productData.InStockProducts} products in stock</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{productData.NotInStockProducts} not in stock</p>
        </CardContent>
      </Card>
    </div>
  )
}
