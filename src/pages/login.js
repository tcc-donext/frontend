import FormPageLayout from 'components/layouts/FormPageLayout';

import { Container, Image } from 'styles/pages/login';

const Login = () => {
  return (
    <Container>
      <div>
        <h1>Página Login</h1>
      </div>
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
