import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      des_email: email,
      des_senha: password
    });

    useTokenHeader(response.data.accessToken);

    return response.data.user;
  } catch (err) {
    console.warn(`Não foi possível fazer o login. ${err}`);
    return null;
  }
};

const refresh = async () => {
  try {
    const response = await api.post('/token');

    useTokenHeader(response.data.accessToken);
  } catch (err) {
    console.warn(`Não foi possível gerar novo token. ${err}`);
    return null;
  }
};

const useTokenHeader = token => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  setTimeout(refresh, 900000);
};
