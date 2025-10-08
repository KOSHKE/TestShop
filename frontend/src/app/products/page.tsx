import { api } from '@/lib/api';

export default async function ProductsPage() {
  const products = await api.products.getAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Products</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of products
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  product,
}: {
  product: Awaited<ReturnType<typeof api.products.getAll>>[0];
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {product.description || 'No description available'}
      </p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">
            {product.totalStock > 0 ? (
              <span className="text-green-600">In stock: {product.totalStock}</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>
        </div>

        <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.totalStock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

