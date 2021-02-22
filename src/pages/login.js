import { useState } from 'react';
import FormPageLayout from 'components/layouts/FormPageLayout';
import Link from 'next/link';

import { Container, Image, Divider } from 'styles/pages/login';
import Button from 'components/Button';
import Input from 'components/Input';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Container>
      <form>
        <Input
          label="Email"
          type="email"
          width="29vw"
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <Input
          label="Senha"
          type="password"
          width="29vw"
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
        <div className="buttonsContainer">
          <Button
            width="100%"
            height="8vh"
            fontSize="1.8em"
            onClick={event => {
              event.preventDefault();
              sendLogin(email, password);
            }}
          >
            LOGAR
          </Button>
          <Divider>ou</Divider>
          <Button width="100%" height="8vh" fontSize="1.8em">
            Cadastre-se
          </Button>
          <p>
            É uma ong?{' '}
            <Link href="#">
              <a>Cadastre-se aqui</a>
            </Link>
          </p>
        </div>
      </form>
      <aside>
        <Image
          src="/images/tela_login.png"
          alt="Desenho decorativo para a página"
        />
      </aside>
    </Container>
  );
};

const sendLogin = async (email, password) => {
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
  }

  const content = await response.json();
  console.log(content.accessToken);
};

Login.layout = FormPageLayout;
Login.getLayoutConfig = {
  header: {
    title: 'Logar',
    logo: true
  },
  footer: {
    back: true
  }
};

export default Login;
