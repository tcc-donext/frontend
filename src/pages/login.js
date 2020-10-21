import { StyledInput } from 'components/Input/styles';
import FormPageLayout from 'components/layouts/FormPageLayout';
import Link from 'next/link';

import { Container, Image, Divider } from 'styles/pages/login';
import Button from 'components/Button';
import Input from 'components/Input';

const Login = () => {
  return (
    <Container>
      <form>
        <Input label="Email" type="email" width="29vw" />
        <Input label="Senha" type="password" width="29vw" />
        <div className="buttonsContainer">
          <Button width="100%" height="8vh" fontSize="1.8em">
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
