import { test, expect } from '@playwright/test'
import { localStorage } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/login')
})

test('can login', async ({ page }) => {
  expect(await localStorage.getItem(page, 'token')).toBe(undefined)

  await page.getByLabel(/username/i).fill('user1')
  await page.getByLabel(/password/i).fill('password')
  await page.getByRole('button', { name: /submit/i }).click()

  await expect(page).toHaveURL('/')
  expect(await localStorage.getItem(page, 'token')).toBeDefined()
  await expect(page.getByText('user1')).toBeVisible()
})
