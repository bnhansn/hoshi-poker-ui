import { test, expect } from '@playwright/test'
import { auth } from './helpers'

test.describe('when logged out', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Poker/)
  })

  test('can navigate to login page', async ({ page }) => {
    await page.getByRole('link', { name: /login/i }).click()
    await expect(page).toHaveURL(/\/login/)
  })

  test('can navigate to signup page', async ({ page }) => {
    await page.getByRole('link', { name: /sign up/i }).click()
    await expect(page).toHaveURL(/\/signup/)
  })
})

test.describe('when logged in', () => {
  test.beforeEach(async ({ page }) => {
    await auth.setup(page)
    await page.goto('/')
  })

  test('does not show login button', async ({ page }) => {
    await expect(page.getByText('user1')).toBeVisible()
    await expect(page.getByRole('link', { name: /login/i })).not.toBeVisible()
  })

  test('can start and stop a poker table', async ({ page }) => {
    await page.getByRole('button', { name: /start table/i }).click()
    await expect(page).toHaveURL(/.*\/tables\/[a-zA-Z0-9]+/)

    const url = page.url()
    const tableId = url.split('/').slice(-1)[0]
    await page.goto('/')

    await expect(page.getByText(tableId)).toBeVisible()
    await page.getByLabel(`Stop Table ${tableId}`).click()
    await expect(page.getByText(tableId)).not.toBeVisible()
  })
})
