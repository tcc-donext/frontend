import { useState } from 'react';
import FormPageLayout from 'components/layouts/FormPageLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Container, Image, Divider } from 'styles/pages/login';
import Button from 'components/Button';
import Input from 'components/Input';
import { useAuth } from './../contexts/auth';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const { signIn } = useAuth();

  return (
    <Container>
      <form>
        <Input
          label="Email"
          type="email"
          width="29vw"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <Input
          label="Senha"
          type="password"
          width="29vw"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
        <div className="buttonsContainer">
          <Button
            width="100%"
            height="8vh"
            fontSize="1.8em"
            onClick={async event => {
              event.preventDefault();
              const success = await signIn(email, password);
              if (success) router.push('/home');
              else {
                setEmail('');
                setPassword('');
              }
            }}
          >
            LOGAR
          </Button>
          <Divider>ou</Divider>
          <Link href="/usuarioCadastro">
            <Button width="100%" height="8vh" fontSize="1.8em">
              Cadastre-se
            </Button>
          </Link>
          <p>
            É uma ong?{' '}
            <Link href="/ongCadastro">
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
