import { useQuery } from '@tanstack/react-query'
import { fetchProducts, Product } from '../api'
import ProductCard from '../components/ProductCard'

export default function Catalog() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetchProducts()
      return response.data
    },
  })

  return (
    <section>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Catálogo de productos</h1>
          <p className="mt-2 text-slate-600">Explora productos disponibles y añade lo que necesites al carrito.</p>
        </div>
      </div>

      {isLoading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p className="text-red-600">Error al cargar productos. Intenta nuevamente.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
