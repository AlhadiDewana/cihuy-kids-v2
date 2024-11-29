import '@testing-library/jest-dom';

// Mock axios
jest.mock('axios', () => ({
  create: () => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
    post: jest.fn().mockResolvedValue({ data: { token: 'fake-token' } })
  })
}));