import { screen } from '@testing-library/react'
import REGISTER_FAILURE from './fixtures/REGISTER_FAILURE.json'
import REGISTER_SUCCESS from './fixtures/REGISTER_SUCCESS.json'
import Page from './page'
import { render, TestWrapper } from '@/test'

test('can signup with username and password', async () => {
  const { user, router } = render(<Page />, {
    url: '/signup',
    wrapper: TestWrapper,
    mocks: [['POST', '/register', REGISTER_SUCCESS]]
  })

  const usernameInput = screen.getByLabelText('Username')
  await user.type(usernameInput, 'my-username')

  const passwordInput = screen.getByLabelText('Password')
  await user.type(passwordInput, 'my-password')

  expect(router.asPath).toEqual('/signup')

  await user.click(screen.getByRole('button', { name: /submit/i }))

  expect(router.asPath).toEqual('/')
})

test('shows error if invalid details', async () => {
  const { user } = render(<Page />, {
    url: '/signup',
    wrapper: TestWrapper,
    mocks: [['POST', '/register', REGISTER_FAILURE, 422]]
  })

  const usernameInput = screen.getByLabelText('Username')
  await user.type(usernameInput, 'my-username')

  const passwordInput = screen.getByLabelText('Password')
  await user.type(passwordInput, 'my-password')

  await user.click(screen.getByRole('button', { name: /submit/i }))

  expect(screen.getByText(/unable to sign up/i)).toBeInTheDocument()
  expect(
    screen.getByText(/should be at least 2 character\(s\)/i)
  ).toBeInTheDocument()
})
