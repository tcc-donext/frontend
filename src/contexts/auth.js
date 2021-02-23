import { createContext, useState, useContext } from 'react';
import { login, logout } from 'services/auth';
import api from 'services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function signIn(email, password) {
    const res = await login(email, password);

    if (!res) return;

    setUser({ user: res.user });
  }

  async function signOut() {
    const res = await logout();

    if (!res) return;

    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const response = useContext(AuthContext);

  return response;
}
