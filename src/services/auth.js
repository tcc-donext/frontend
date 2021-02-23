export const login = async (email, password) => {
  const response = await fetch(`${process.env.SERVER_URL}/login`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      des_email: email,
      des_senha: password
    }),
    mode: 'cors'
  });

  if (!response.ok) {
    console.log(`Error. ${response.status}`);
    window.location.href = '/login';
    return null;
  }

  const content = await response.json();
  return content;
};
