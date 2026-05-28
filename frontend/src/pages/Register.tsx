import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { register as registerUser } from '../api'

const registerSchema = z
  .object({
    first_name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    last_name: z.string().min(2, { message: 'El apellido debe tener al menos 2 caracteres' }),
    email: z.string().email({ message: 'Ingresa un email válido' }),
    age: z.preprocess((value) => Number(value), z.number().int().positive({ message: 'Ingresa una edad válida' })),
    user_type: z.enum(['user', 'admin']),
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
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        age: data.age,
        user_type: data.user_type,
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
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Nombre</span>
            <input
              type="text"
              {...register('first_name')}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none"
              placeholder="Nombre"
            />
            {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Apellido</span>
            <input
              type="text"
              {...register('last_name')}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none"
              placeholder="Apellido"
            />
            {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Edad</span>
            <input
              type="number"
              {...register('age')}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none"
              placeholder="18"
            />
            {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Tipo de usuario</span>
            <select
              {...register('user_type')}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:border-slate-900 focus:outline-none"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
            {errors.user_type && <p className="mt-1 text-sm text-red-600">{errors.user_type.message}</p>}
          </label>
        </div>

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
