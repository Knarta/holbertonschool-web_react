import mockAxios from 'jest-mock-axios';
import axios from 'axios';
import authReducer, { login, logout } from '../auth/authSlice';

afterEach(() => {
  mockAxios.reset();
});

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  };

  it('should return the correct initial state by default', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should update the state correctly when login is dispatched', async () => {
    const credentials = { email: 'user@test.com', password: 'secret123' };

    const request = axios.post('/login', credentials);

    mockAxios.mockResponse({ data: credentials });

    const response = await request;
    const state = authReducer(initialState, login(response.data));

    expect(state.user.email).toBe(credentials.email);
    expect(state.user.password).toBe(credentials.password);
    expect(state.isLoggedIn).toBe(true);
  });

  it('should reset the state correctly when logout is dispatched', async () => {
    const loggedInState = {
      user: { email: 'user@test.com', password: 'secret123' },
      isLoggedIn: true,
    };

    const request = axios.post('/logout');

    mockAxios.mockResponse({ data: {} });

    await request;
    const state = authReducer(loggedInState, logout());

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
  });
});
