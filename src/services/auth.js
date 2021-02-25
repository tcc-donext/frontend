import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      des_email: email,
      des_senha: password
    });

    useTokenHeader(response.data.accessToken);

    return response.data;
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

export const logout = async () => {
  api.defaults.headers.common.Authorization = '';

  try {
    // invalidate refresh token
    const response = await api.post('/logout');

    if (response.status == 200) return true;
  } catch (err) {
    console.err(err);
    return false;
  }
};

const useTokenHeader = token => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('userToken', token);

  setTimeout(refresh, 900000);
};
