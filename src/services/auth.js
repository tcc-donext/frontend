import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      des_email: email,
      des_senha: password
    });

    return response.data;
  } catch (err) {
    console.warn(`Não foi possível fazer o login: ${err}`);
    return null;
  }
};
