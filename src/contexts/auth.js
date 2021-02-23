import { createContext, useState, useContext, useEffect } from 'react';
import { login, logout } from 'services/auth';
import { useRouter } from 'next/router';
import api from 'services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = localStorage.getItem('userData');
      const storagedToken = localStorage.getItem('userToken');

      if (storagedToken && storagedUser) {
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
      }
    }

    loadStoragedData();
  }, []);

  async function signIn(email, password) {
    const res = await login(email, password);

    if (!res) {
      router.reload();
      return;
    }

    setUser(res.user);
    localStorage.setItem('userData', JSON.stringify(res.user));
    localStorage.setItem('userToken', res.accessToken);
  }

  async function signOut() {
    const res = await logout();

    if (!res) return;

    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
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
