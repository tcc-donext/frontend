import FormPageLayout from 'components/layouts/FormPageLayout';
import Link from 'next/link';

import { Container, Image, ImageCentral } from 'styles/pages/perfilOng.js';
import Button from 'components/Button';
import Input from 'components/Input';

const PerfilOng = () => {
  return (
    <Container>
      <form>
        <Input label="Nome da Ong" type="text" width="13vw" />
        <Input label="Telefone" type="text" width="13vw" />
        <Input label="Email" type="Email" width="30vw" />
        <Input label="CEP" type="numeric" width="13vw" />
        <Input label="UF" type="text" width="13vw" />
        <Input label="Endereço" type="text" width="30vw" />
        <Input label="Senha" type="password" width="15vw" />
        <div className="buttonsContainer">
          <Button width="100%" height="8vh" fontSize="1.8em">
            Salvar
          </Button>
        </div>
      </form>
      <div>
        <div className="buttonsImage">
          <Button class="botaoFoto">
            <Image
              className="logoutIco"
              src="/images/plus.png"
              alt="Imagem para alterar foto de perfil"
            ></Image>
          </Button>
          <h3>Clique para alterar a foto</h3>
        </div>
        <span className="Desconectar">
          <Button className="botaoDesconectar" onClick={() => router.back()}>
            <Image
              className="logoutIco"
              src="/images/logout.png"
              alt="Icone Logout"
            ></Image>
            Desconectar
          </Button>
        </span>
      </div>
      <div>
        <ImageCentral
          src="/images/ong_settings.png"
          alt="Desenho decorativo para a página"
        />
      </div>
    </Container>
  );
};

PerfilOng.layout = FormPageLayout;
PerfilOng.getLayoutConfig = {
  header: {
    title: 'Perfil',
    logo: true
  },
  footer: {
    back: true
  }
};

export default PerfilOng;
