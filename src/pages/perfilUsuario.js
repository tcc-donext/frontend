import FormPageLayout from 'components/layouts/FormPageLayout';
import Link from 'next/link';

import { Container, Image, Divider } from 'styles/pages/perfilUsuario.js';
import Button from 'components/Button';
import Input from 'components/Input';

const PerfilUsuario = () => {
  return (
    <Container>
      <form>
        <Input label="Nome" type="text" width="29vw" />
        <Input label="Telefone" type="text" width="14vw"/>
        <Input label="Senha" type="password" width="14vw"/>
        <Input label="Email" type="Email" width="29vw" />
        <div className="buttonsContainer">
          <Button width="100%" height="8vh" fontSize="1.8em">
            Salvar
          </Button>
        </div>
      </form>
      <aside>
        <Image
          src="/images/avatar.png"
          alt="Desenho decorativo para a página"
        />
        <h1>Nome da Pessoa Completo Silva</h1>
        <h2>R$ 750,00</h2>
        <h3>Doado para campanhas</h3>
        <h2>R$ 300,00</h2>
        <h3>Doado para instituições</h3>
      </aside>
      <span className="Desconectar">
      <Button className="botaoDesconectar" onClick={() => router.back()}><Image className="logoutIco" src="/images/logout.png"
          alt="Icone Logout"></Image>Desconectar</Button>
      </span>
      
    </Container>
    
  );
};

PerfilUsuario.layout = FormPageLayout;
PerfilUsuario.getLayoutConfig = {
  header: {
    title: 'Perfil',
    logo: true
  },
  footer: {
    back: true
  }
};

export default PerfilUsuario;