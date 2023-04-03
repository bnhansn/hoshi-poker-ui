import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestMock =
  | [HTTPMethod, string, any]
  | [HTTPMethod, string, any, number]

export function createAxiosAdapter(mocks: Array<RequestMock> = []) {
  const adapter = new MockAdapter(axios, { onNoMatch: 'throwException' })

  for (const mock of mocks) {
    const [method, url, data, status = 200] = mock

    switch (method) {
      case 'GET': {
        adapter.onGet(url).reply(status, data)
        break
      }
      case 'POST': {
        adapter.onPost(url).reply(status, data)
        break
      }
      case 'PUT': {
        adapter.onPut(url).reply(status, data)
        break
      }
      case 'PATCH': {
        adapter.onPatch(url).reply(status, data)
        break
      }
      case 'DELETE': {
        adapter.onDelete(url).reply(status, data)
        break
      }
    }
  }

  return adapter
}
