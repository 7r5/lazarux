import type { Product } from '../api'
import useCartStore from '../store/useCartStore'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <img src={product.image_url || 'https://via.placeholder.com/400'} alt={product.name} className="mb-4 h-48 w-full rounded-xl object-cover" />
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
        <p className="mt-2 text-sm text-slate-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() =>
              addItem({
                product_id: product.id,
                quantity: 1,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
              })
            }
            className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-700"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </article>
  )
}
