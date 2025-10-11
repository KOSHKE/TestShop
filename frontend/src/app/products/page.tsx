import { api } from '@/lib/api';
import { Card, Badge } from '@/components/ui';

export default async function ProductsPage() {
  const products = await api.products.getAll();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <div className="inline-block mb-4">
          <Badge color="blue" size="sm">
            {products.length} Products
          </Badge>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Products
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Browse our collection of high-quality products
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
  const inStock = product.totalStock > 0;

  return (
    <div className="group relative">
      {/* Subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl opacity-0 group-hover:opacity-10 blur transition duration-500" />
      
      <Card variant="default" padding="md" hover="lift" className="relative h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <Badge color={inStock ? 'green' : 'orange'} size="sm">
            {inStock ? 'In Stock' : 'Out'}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1 leading-relaxed">
          {product.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </p>
            {inStock && (
              <p className="text-xs text-gray-500 mt-1">
                {product.totalStock} units available
              </p>
            )}
          </div>

          <button 
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 shadow-sm hover:shadow-md"
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </Card>
    </div>
  );
}

