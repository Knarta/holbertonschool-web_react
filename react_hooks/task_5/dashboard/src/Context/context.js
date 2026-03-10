import { createContext } from 'react';

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const defaultLogOut = () => {};

const AppContext = createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

export { AppContext as newContext, defaultUser };
export default AppContext;
