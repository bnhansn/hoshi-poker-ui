import { screen } from '@testing-library/react'
import LOGIN_FAILURE from './fixtures/LOGIN_FAILURE.json'
import LOGIN_SUCCESS from './fixtures/LOGIN_SUCCESS.json'
import Page from './page'
import { render, TestWrapper } from '@/test'

test('can login with username and password', async () => {
  const { user, router } = render(<Page />, {
    url: '/login',
    wrapper: TestWrapper,
    mocks: [['POST', '/sessions', LOGIN_SUCCESS]]
  })

  const usernameInput = screen.getByLabelText('Username')
  await user.type(usernameInput, 'my-username')

  const passwordInput = screen.getByLabelText('Password')
  await user.type(passwordInput, 'my-password')

  expect(router.asPath).toEqual('/login')

  await user.click(screen.getByRole('button', { name: /submit/i }))

  expect(router.asPath).toEqual('/')
})

test('shows error if incorrect password', async () => {
  const { user } = render(<Page />, {
    url: '/login',
    wrapper: TestWrapper,
    mocks: [['POST', '/sessions', LOGIN_FAILURE, 401]]
  })

  const usernameInput = screen.getByLabelText('Username')
  await user.type(usernameInput, 'my-username')

  const passwordInput = screen.getByLabelText('Password')
  await user.type(passwordInput, 'my-password')

  await user.click(screen.getByRole('button', { name: /submit/i }))

  expect(screen.getByText(/incorrect password/i)).toBeInTheDocument()
})
