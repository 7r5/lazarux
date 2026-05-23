import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useCartStore from '../store/useCartStore'
import { checkout } from '../api'

const schema = z.object({
  shipping_address: z.string().min(10, { message: 'Ingresa una dirección válida' }),
  payment_method: z.string().min(4, { message: 'Selecciona un método de pago' }),
})

type CheckoutData = z.infer<typeof schema>

export default function Checkout() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: CheckoutData) => {
    await checkout({ items, shipping_address: data.shipping_address, payment_method: data.payment_method })
    clearCart()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-lg">
      <h1 className="mb-4 text-3xl font-semibold text-slate-900">Checkout</h1>
      <p className="mb-6 text-slate-600">Completa tus datos para simular el pago del pedido.</p>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Dirección de envío</span>
          <textarea
            {...register('shipping_address')}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none"
          />
          {errors.shipping_address && <p className="mt-1 text-sm text-red-600">{errors.shipping_address.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Método de pago</span>
          <select
            {...register('payment_method')}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none"
          >
            <option value="">Selecciona una opción</option>
            <option value="Tarjeta de crédito">Tarjeta de crédito</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Pago contra entrega">Pago contra entrega</option>
          </select>
          {errors.payment_method && <p className="mt-1 text-sm text-red-600">{errors.payment_method.message}</p>}
        </label>

        <button type="submit" className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white">
          Finalizar compra
        </button>
      </form>
    </div>
  )
}
