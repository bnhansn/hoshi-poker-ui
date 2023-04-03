import fs from 'fs'
import { test as setup } from '@playwright/test'
import { ApiService } from '@/services'

/**
 * This setup function is run once before the test suite starts. It makes an API
 * request to create a user session and stores the result in a local file.
 * Individual tests can then use the `auth.setup` helper function to read the
 * file and write the session JWT into local storage so the browser will be
 * authenticated.
 */
setup('auth', async () => {
  const api = new ApiService()
  const data = await api.userService.login({
    username: 'user1',
    password: 'password'
  })
  fs.mkdirSync('playwright/.auth', { recursive: true })
  fs.writeFileSync('playwright/.auth/session.json', JSON.stringify(data))
})
