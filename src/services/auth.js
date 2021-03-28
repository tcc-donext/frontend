import api from './api';
let refreshInterceptor = null;

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      des_email: email,
      des_senha: password
    });

    useTokenHeader(response.data.accessToken);

    refreshInterceptor = api.interceptors.response.use(
      response => {
        return response;
      },
      function (err) {
        refresh();
      }
    );

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
    console.log(`Novo token de acesso gerado: ${response.data.accessToken}`);

    return true;
  } catch (err) {
    console.warn(`Não foi possível gerar novo token. Acesso expirado. ${err}`);
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');

    return false;
  }
};

export const logout = async () => {
  api.defaults.headers.common.Authorization = '';
  if (refreshInterceptor) api.interceptors.request.eject(refreshInterceptor);

  try {
    // invalidate refresh token
    await api.post('/logout');

    return true;
  } catch (err) {
    console.err(err);

    return false;
  }
};

const useTokenHeader = token => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('userToken', token);

  setTimeout(refresh, 895000);
};
