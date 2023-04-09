import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines className props into one string, useful for tailwindcss components.
 *
 * @param classes A list of class name strings
 * @returns String of combined class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
