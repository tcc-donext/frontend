import { createContext, useState } from 'react';
import { login } from 'services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function signIn(email, password) {
    const res = await login(email, password);

    console.log(res);
    if (res) setUser({ user: res.user, token: res.acessToken });
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
