import { render as _render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'
import { createAxiosAdapter, RequestMock } from './adapter'
import storage from '@/lib/storage'

export function render(
  jsx: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'> & {
    url?: string
    mocks?: Array<RequestMock>
    authenticated?: boolean
  }
) {
  const { authenticated = true } = options || {}

  if (authenticated) {
    storage.setItem('token', 'test-token')
  }

  const adapter = createAxiosAdapter(options?.mocks)

  if (options?.url) {
    mockRouter.push(options.url)
  }

  return {
    adapter,
    user: userEvent.setup(),
    router: mockRouter,
    ..._render(jsx, options)
  }
}
