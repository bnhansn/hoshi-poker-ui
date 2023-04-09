import { logger } from '@/lib/logger'

interface IStorage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: any) => void
  removeItem: (key: string) => void
}

class MemoryStore implements IStorage {
  store: Record<string, any> = {}

  getItem<T = string>(key: string): T | null {
    return (this.store[key] as T) ?? null
  }

  setItem(key: string, value: any) {
    this.store[key] = value
  }

  removeItem(key: string) {
    delete this.store[key]
  }
}

/**
 * A localStorage implementation that falls back to an in-memory store when
 * localStorage is disabled.
 */
class Storage {
  store: IStorage =
    typeof localStorage !== 'undefined' ? localStorage : new MemoryStore()

  getItem<T = string>(key: string): T | null {
    try {
      const item = this.store.getItem(key)
      return item && JSON.parse(item)
    } catch (error) {
      logger.error(error)
      this.removeItem(key)
      return null
    }
  }

  setItem(key: string, value: any) {
    try {
      this.store.setItem(key, JSON.stringify(value))
    } catch (error) {
      logger.error(error)
    }
  }

  removeItem(key: string) {
    try {
      this.store.removeItem(key)
    } catch (error) {
      logger.error(error)
    }
  }
}

const storage = new Storage()

export default storage
