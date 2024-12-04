import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:9000/api/login', (req, res, ctx) => {
    return res(
      ctx.json({
        token: 'fake-jwt-token'
      })
    );
  }),
  
  rest.get('http://localhost:9000/api/profile', (req, res, ctx) => {
    return res(
      ctx.json({
        name: 'Test User',
        email: 'test@example.com'
      })
    );
  })
];
