import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../components/auth/login';

// Mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Mock userAPI
jest.mock('../../api', () => ({
  userAPI: {
    login: jest.fn().mockResolvedValue({ data: { token: 'fake-token' } })
  }
}));

describe('Login Component', () => {
  const renderLogin = () => {
    return render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockedUsedNavigate.mockClear();
  });

  test('renders login form', () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/Masukkan email anda/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Masukkan kata sandi anda/i)).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    renderLogin();
    
    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/Masukkan email anda/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByPlaceholderText(/Masukkan kata sandi anda/i), {
      target: { value: 'password123' }
    });

    // Find and click submit button
    const loginButton = screen.getByRole('button', { 
      name: /^masuk$/i,
    });
    fireEvent.click(loginButton);

    // Wait for and verify state updates
    await waitFor(() => {
      expect(screen.queryByText(/Terjadi kesalahan/i)).not.toBeInTheDocument();
    });
  });

  test('shows error message on login failure', async () => {
    // Mock API to reject
    const mockError = new Error('Login failed');
    jest.spyOn(require('../../api').userAPI, 'login')
      .mockRejectedValueOnce(mockError);

    renderLogin();
    
    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/Masukkan email anda/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByPlaceholderText(/Masukkan kata sandi anda/i), {
      target: { value: 'wrong-password' }
    });

    const loginButton = screen.getByRole('button', { name: /^masuk$/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Terjadi kesalahan/i)).toBeInTheDocument();
    });
  });
});