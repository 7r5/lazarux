import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App'

test('renders login page when no token', () => {
  localStorage.removeItem('dummy_token')
  const queryClient = new QueryClient()

  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>,
  )

  expect(screen.getByRole('heading', { name: /Iniciar sesión/i })).toBeInTheDocument()
})
