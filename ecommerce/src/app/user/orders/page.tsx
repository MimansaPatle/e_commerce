import { Package, Truck, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  // Mock data
  const orders = [
    {
      id: "ORD-1234",
      date: "2023-04-15",
      status: "Delivered",
      items: 3,
      total: 129.99,
      trackingNumber: "TRK928374651",
    },
    {
      id: "ORD-1235",
      date: "2023-04-10",
      status: "Shipped",
      items: 2,
      total: 79.5,
      trackingNumber: "TRK837465192",
    },
    {
      id: "ORD-1236",
      date: "2023-04-05",
      status: "Processing",
      items: 1,
      total: 249.99,
      trackingNumber: null,
    },
    {
      id: "ORD-1237",
      date: "2023-03-28",
      status: "Delivered",
      items: 4,
      total: 156.75,
      trackingNumber: "TRK746519283",
    },
    {
      id: "ORD-1238",
      date: "2023-03-15",
      status: "Delivered",
      items: 2,
      total: 89.99,
      trackingNumber: "TRK651928374",
    },
  ]

  // Function to get the appropriate icon based on order status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Shipped":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "Processing":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Orders</h1>
        <p className="text-muted-foreground">View and track your order history</p>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 pt-1 text-sm font-medium">Order ID</th>
                  <th className="pb-3 pt-1 text-sm font-medium">Date</th>
                  <th className="pb-3 pt-1 text-sm font-medium">Status</th>
                  <th className="pb-3 pt-1 text-sm font-medium">Items</th>
                  <th className="pb-3 pt-1 text-sm font-medium">Total</th>
                  <th className="pb-3 pt-1 text-sm font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 text-sm font-medium">{order.id}</td>
                    <td className="py-4 text-sm">{order.date}</td>
                    <td className="py-4 text-sm">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{order.status}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm">
                      {order.items} item{order.items !== 1 ? "s" : ""}
                    </td>
                    <td className="py-4 text-sm font-medium">${order.total.toFixed(2)}</td>
                    <td className="py-4 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/user/orders/${order.id}`} className="btn-outline py-1 px-3 h-8">
                          Details
                        </Link>
                        {order.status === "Delivered" && (
                          <button className="btn-secondary py-1 px-3 h-8">Review</button>
                        )}
                        {order.status === "Shipped" && <button className="btn-primary py-1 px-3 h-8">Track</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Explanation */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Order Processing</h3>
              <p className="text-sm text-muted-foreground">Your order is being prepared for shipment</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-secondary/10 p-2">
              <Truck className="h-5 w-5 text-secondary" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Order Shipped</h3>
              <p className="text-sm text-muted-foreground">Your order is on its way to you</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-accent/10 p-2">
              <CheckCircle className="h-5 w-5 text-accent" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Order Delivered</h3>
              <p className="text-sm text-muted-foreground">Your order has been delivered successfully</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
