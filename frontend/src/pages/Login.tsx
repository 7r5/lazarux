import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '../api'

const loginSchema = z.object({
  email: z.string().email({ message: 'Ingresa un email válido' }),
  password: z.string().min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }),
})

type LoginData = z.infer<typeof loginSchema>

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void
}

export default function Login({ setIsAuthenticated }: LoginProps) {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginData) => {
    try {
      setApiError(null)
      const response = await login(data)
      localStorage.setItem('dummy_token', response.data.access_token)
      setIsAuthenticated(true)
      navigate('/')
    } catch (error: any) {
      setApiError(error.response?.data?.detail || 'Ocurrió un error al iniciar sesión')
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Iniciar sesión</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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

        {apiError && <p className="text-sm text-red-600">{apiError}</p>}

        <button type="submit" className="w-full rounded-xl bg-slate-900 px-4 py-3 text-white">
          Iniciar sesión
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-slate-600">
        ¿No tienes cuenta? <Link to="/register" className="font-semibold text-slate-900">Regístrate</Link>
      </div>
    </div>
  )
}
