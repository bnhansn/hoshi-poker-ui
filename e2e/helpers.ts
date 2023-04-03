import fs from 'fs'
import { type Page } from '@playwright/test'

/**
 * window.localStorage is not directly available in playwright tests, so this
 * provides a helper for the page to access it.
 */
export const localStorage = {
  async getItem<T = string>(page: Page, key: string): Promise<T> {
    const localStorage = await page.evaluate(() => window.localStorage)
    const item = localStorage[key]
    return item && JSON.parse(item)
  }
}

export const auth = {
  /**
   * Uses the file created by auth.setup.ts to write the session JWT into
   * localStorage.
   */
  async setup(page: Page) {
    const data = JSON.parse(
      fs.readFileSync('playwright/.auth/session.json', 'utf8')
    )

    await page.addInitScript((token) => {
      window.localStorage.setItem('token', JSON.stringify(token))
    }, data.token)
  }
}
