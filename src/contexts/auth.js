import { createContext, useState, useContext } from 'react';
import { login } from 'services/auth';
import api from 'services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function signIn(email, password) {
    const res = await login(email, password);

    if (!res) return;

    api.defaults.headers.common['Authorization'] = `Bearer ${res.accessToken}`;
    setUser({ user: res.user });
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const response = useContext(AuthContext);

  return response;
}
