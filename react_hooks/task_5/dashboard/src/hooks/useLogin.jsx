import { useState, useMemo, useCallback } from 'react';

function useLogin(onLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const enableSubmit = useMemo(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = email.length > 0 && regex.test(email);
    const passwordValid = password.length >= 8;
    return emailValid && passwordValid;
  }, [email, password]);

  const handleChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleLoginSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (onLogin) {
        onLogin(email, password);
      }
    },
    [email, password, onLogin]
  );

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
}

export default useLogin;
