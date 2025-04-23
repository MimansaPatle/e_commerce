import { CreditCard, Package, RefreshCcw, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  // Mock data
  const recentOrders = [
    { id: "ORD-1234", date: "2023-04-15", status: "Delivered", total: 129.99 },
    { id: "ORD-1235", date: "2023-04-10", status: "Shipped", total: 79.5 },
    { id: "ORD-1236", date: "2023-04-05", status: "Processing", total: 249.99 },
  ]

  const recommendedProducts = [
    { id: 1, name: "Premium Wireless Headphones", price: 199.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Smart Watch Series 5", price: 299.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Ultra HD 4K Monitor", price: 349.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Ergonomic Office Chair", price: 249.99, image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <div className="space-y-6 p-4 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back, John! Here's an overview of your account.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Orders",
            value: 12,
            icon: <ShoppingCart className="h-5 w-5 text-blue-500" />,
            bg: "bg-blue-100"
          },
          {
            title: "Pending Delivery",
            value: 2,
            icon: <Package className="h-5 w-5 text-green-500" />,
            bg: "bg-green-100"
          },
          {
            title: "Returns",
            value: 1,
            icon: <RefreshCcw className="h-5 w-5 text-yellow-500" />,
            bg: "bg-yellow-100"
          },
          {
            title: "Total Spent",
            value: "$1,248.50",
            icon: <CreditCard className="h-5 w-5 text-purple-500" />,
            bg: "bg-purple-100"
          },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <div className="flex items-center">
              <div className={`rounded-full p-2 ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border bg-white dark:bg-zinc-900 p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your latest purchases</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Order ID</th>
                <th className="py-2 text-left">Date</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Total</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.date}</td>
                  <td className="py-2">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-blue-100 text-blue-600"
                        : order.status === "Shipped"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2">${order.total.toFixed(2)}</td>
                  <td className="py-2 text-right">
                    <Link href={`/user/orders/${order.id}`} className="text-blue-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <Link href="/user/orders" className="text-sm font-medium text-blue-600 hover:underline">
            View all orders
          </Link>
        </div>
      </div>

      {/* Recommended Products */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border bg-white dark:bg-zinc-900 p-4 shadow-sm transition hover:shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto h-40 w-40 object-cover"
              />
              <h3 className="mt-4 text-sm font-medium">{product.name}</h3>
              <p className="mt-1 text-lg font-semibold">${product.price.toFixed(2)}</p>
              <button className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
