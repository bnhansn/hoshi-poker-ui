import { AxiosError } from 'axios'

/**
 * Extracts error messages from an API response for a specific field in a form.
 *
 * @param error An AxiosError object
 * @param field An input field name
 * @returns A list of error messages for the field
 */
export function getFieldErrors(error: unknown, field: string): Array<string> {
  if (error instanceof AxiosError && error.response) {
    const data = error.response.data
    if (typeof data.errors === 'object') {
      return data.errors[field] || []
    }
    return []
  }
  return []
}
