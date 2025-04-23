import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"

export default function WishlistPage() {
  // Mock data
  const wishlistItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      discount: null,
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 299.99,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      discount: 15,
    },
    {
      id: 3,
      name: "Ultra HD 4K Monitor",
      price: 349.99,
      image: "/placeholder.svg?height=200&width=200",
      inStock: false,
      discount: null,
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 249.99,
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
      discount: 10,
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Wishlist</h1>
        <p className="text-muted-foreground">Items you've saved for later</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Heart className="h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-medium">Your wishlist is empty</h2>
            <p className="text-muted-foreground">Browse our products and add items to your wishlist</p>
            <button className="btn-primary mt-4">Browse Products</button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="card hover-lift overflow-hidden">
              <div className="relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="h-48 w-full object-cover"
                />
                {item.discount && (
                  <div className="absolute left-2 top-2 rounded-full bg-secondary px-2 py-1 text-xs font-bold text-white">
                    {item.discount}% OFF
                  </div>
                )}
                <button
                  className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-500 shadow-md hover:bg-red-50"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{item.name}</h3>
                <div className="mt-1 flex items-center">
                  {item.discount ? (
                    <>
                      <span className="text-lg font-bold">${(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                      <span className="ml-2 text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="mt-2">
                  {item.inStock ? (
                    <span className="text-xs text-green-600">In Stock</span>
                  ) : (
                    <span className="text-xs text-red-500">Out of Stock</span>
                  )}
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="btn-primary flex-1 flex items-center justify-center" disabled={!item.inStock}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {wishlistItems.length > 0 && (
        <div className="flex justify-between items-center">
          <button className="btn-outline">Clear Wishlist</button>
          <button className="btn-primary">Add All to Cart</button>
        </div>
      )}
    </div>
  )
}
