import mockAxios from 'jest-mock-axios';
import authReducer, { login, logout, initialState } from '../auth/authSlice';

afterEach(() => {
  mockAxios.reset();
});

describe('authSlice', () => {
  it('returns the correct initial state by default', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('updates the state correctly when the login action is dispatched', () => {
    const payload = { email: 'user@example.com', password: 'hunter2' };
    const state = authReducer(initialState, login(payload));

    expect(state.user.email).toBe(payload.email);
    expect(state.user.password).toBe(payload.password);
    expect(state.user.isLoggedIn).toBe(true);
  });

  it('resets the state correctly when the logout action is dispatched', () => {
    const afterLogin = authReducer(
      initialState,
      login({ email: 'logged@in.com', password: 'secret' })
    );
    const state = authReducer(afterLogin, logout());

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.user.isLoggedIn).toBe(false);
  });
});
