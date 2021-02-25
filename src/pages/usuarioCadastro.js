import FormPageLayout from 'components/layouts/FormPageLayout';
import Link from 'next/link';

import { Container, Image, Divider } from 'styles/pages/usuarioCadastro';
import Button from 'components/Button';
import Input from 'components/Input';

const Registrar = () => {
  return (
    <Container>
      <form>
        <Input label="Nome *" type="text" width="29vw" />
        <Input label="Email *" type="Email" width="29vw" />
        <Input label="Senha *" type="password" width="14vw"/>
        <Input label="Telefone *" type="text" width="14vw"/>
        <div className="buttonsContainer">
          <Button width="100%" height="8vh" fontSize="1.8em">
            REGISTRAR
          </Button>
        </div>
      </form>
      <aside>
        <Image
          src="/images/cadastro_usuario.png"
          alt="Desenho decorativo para a página"
        />
      </aside>
    </Container>
  );
};

Registrar.layout = FormPageLayout;
Registrar.getLayoutConfig = {
  header: {
    title: 'Registrar',
    logo: true
  },
  footer: {
    back: true
  }
};

export default Registrar;
