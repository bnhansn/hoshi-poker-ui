/* eslint-disable no-console, @typescript-eslint/no-explicit-any */

class Logger {
  private prefix: string
  private isTest: boolean

  constructor(prefix: string) {
    this.prefix = prefix
    this.isTest = process.env.NODE_ENV === 'test'
  }

  debug(...input: any[]) {
    if (!this.isTest) {
      console.debug(this.prefix, ...input)
    }
  }

  error(...input: any[]) {
    if (!this.isTest) {
      console.error(this.prefix, ...input)
    }
  }

  info(...input: any[]) {
    if (!this.isTest) {
      console.info(this.prefix, ...input)
    }
  }

  log(...input: any[]) {
    if (!this.isTest) {
      console.log(this.prefix, ...input)
    }
  }

  warn(...input: any[]) {
    if (!this.isTest) {
      console.warn(this.prefix, ...input)
    }
  }
}

export const logger = new Logger('hoshi:')
