import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)

  const total = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0)

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Tu carrito</h1>
          <p className="mt-2 text-slate-600">Revisa los productos que agregaste antes de pagar.</p>
        </div>
        <Link to="/checkout" className="rounded-xl bg-slate-900 px-5 py-3 text-white">
          Ir a pagar
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-slate-600">El carrito está vacío. Agrega productos desde el catálogo.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product_id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{item.name ?? `Producto #${item.product_id}`}</p>
                  <p className="text-slate-600">Cantidad: {item.quantity}</p>
                  <p className="text-slate-600">Precio: ${item.price?.toFixed(2) ?? '0.00'}</p>
                </div>
                <button
                  onClick={() => removeItem(item.product_id)}
                  className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-slate-700">Total aproximado:</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">${total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  )
}
