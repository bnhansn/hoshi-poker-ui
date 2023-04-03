import { screen, waitFor } from '@testing-library/react'
import { AppContainer } from './AppContainer'
import { AppHeader } from './AppHeader'
import GET_CURRENT_USER_SUCCESS from './fixtures/GET_CURRENT_USER_SUCCESS.json'
import { render, TestWrapper } from '@/test'
import storage from '@/utils/storage'

test('shows logged in user and button to logout', async () => {
  storage.setItem('token', 'some-token')
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: new URL('http://localhost:3000/some-page')
  })

  const { user } = render(
    <AppContainer>
      <AppHeader />
    </AppContainer>,
    {
      wrapper: TestWrapper,
      mocks: [['GET', '/me', GET_CURRENT_USER_SUCCESS]]
    }
  )

  await waitFor(() => {
    expect(screen.getByText('user1')).toBeInTheDocument()
  })

  expect(window.location.pathname).toBe('/some-page')

  await user.click(screen.getByRole('button', { name: /logout/i }))

  expect(window.location.pathname).toBe('/')
})

test('shows login and signup buttons if no user is logged in', async () => {
  const { user, router } = render(
    <AppContainer>
      <AppHeader />
    </AppContainer>,
    { url: '/', wrapper: TestWrapper }
  )

  expect(router.asPath).toBe('/')

  await user.click(screen.getByText(/login/i))

  expect(router.asPath).toBe('/login')

  await user.click(screen.getByText(/sign up/i))

  expect(router.asPath).toBe('/signup')
})
