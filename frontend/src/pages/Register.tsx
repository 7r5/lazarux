import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { register as registerUser } from '../api'

const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }).optional(),
    email: z.string().email({ message: 'Ingresa un email válido' }),
    password: z.string().min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm_password'],
  })

type RegisterData = z.infer<typeof registerSchema>

interface RegisterProps {
  setIsAuthenticated: (value: boolean) => void
}

export default function Register({ setIsAuthenticated }: RegisterProps) {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterData) => {
    try {
      setApiError(null)
      const response = await registerUser({
        email: data.email,
        password: data.password,
        name: data.name?.trim(),
      })

      localStorage.setItem('dummy_token', response.data.access_token)
      setIsAuthenticated(true)
      navigate('/')
    } catch (error: any) {
      setApiError(error.response?.data?.detail || 'Ocurrió un error al registrarse')
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Crear cuenta</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Nombre</span>
          <input
            type="text"
            {...register('name')}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none"
            placeholder="Opcional"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            {...register('email')}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Contraseña</span>
          <input
            type="password"
            {...register('password')}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Confirmar contraseña</span>
          <input
            type="password"
            {...register('confirm_password')}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none"
          />
          {errors.confirm_password && (
            <p className="mt-1 text-sm text-red-600">{errors.confirm_password.message}</p>
          )}
        </label>

        {apiError && <p className="text-sm text-red-600">{apiError}</p>}

        <button type="submit" className="w-full rounded-xl bg-slate-900 px-4 py-3 text-white">
          Registrarse
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-slate-600">
        ¿Ya tienes cuenta? <Link to="/login" className="font-semibold text-slate-900">Inicia sesión</Link>
      </div>
    </div>
  )
}
