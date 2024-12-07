import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/demo', () => {
    return HttpResponse.json({
      name: 'demo',
    })
  }),
]
