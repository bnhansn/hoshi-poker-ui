import { AxiosError } from 'axios'
import { getFieldErrors } from './error'

function createAxiosError(data: any) {
  return new AxiosError('Error', AxiosError.ERR_BAD_REQUEST, {} as any, {}, {
    data
  } as any)
}

describe('getFieldErrors', () => {
  test('returns a list of error messages for a field', () => {
    const error = createAxiosError({
      errors: {
        password: ['should be at least 8 character(s)'],
        username: [
          'should be at least 2 character(s)',
          'has invalid characters'
        ]
      }
    })

    expect(getFieldErrors(error, 'password')).toEqual([
      'should be at least 8 character(s)'
    ])

    expect(getFieldErrors(error, 'username')).toEqual([
      'should be at least 2 character(s)',
      'has invalid characters'
    ])

    expect(getFieldErrors(error, 'nothing')).toEqual([])
  })

  test('returns empty list if error is not an AxiosError', () => {
    expect(getFieldErrors(new Error('test'), 'username')).toEqual([])
  })
})
