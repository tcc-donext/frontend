import { useState, useEffect } from 'react';
import api from 'services/api';
import { useAuth, ong } from './../contexts/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

import FormPageLayout from 'components/layouts/FormPageLayout';
import { Container, Image, ImageCentral } from 'styles/pages/perfilOng.js';
import Button from 'components/Button';
import Input from 'components/Input';

const PerfilOng = () => {
  const { signed, user } = useAuth();
  const [ongData, setOngData] = useState(null);
  const router = useRouter();

  const infOng = async id => {
    try {
      const response = await api.get(`/ongs/${id}`);

      setOngData(response.data);
    } catch (err) {
      console.warn(`Não foi possível recuperar as informações da Ong. ${err}`);
      return null;
    }
  };

  useEffect(() => {
    if (!signed) {
      router.push('/');
    }
    infOng(user.id);
  }, [ongData]);

  const [
    nom_ong = 'ongData[0].nom_ONG',
    telefone = 'ongData[1].nro_telefone',
    email = 'ongData[1].des_email',
    cep = 'ongData[0].nro_cep',
    uf = '',
    endereco = 'ongData[0].des_endereco',
    foto = 'user.image'
  ] = [];

  return (
    <Container>
      <form>
        <Input label="Nome da Ong" type="text" width="13vw" value={nom_ong} />
        <Input label="Telefone" type="text" width="13vw" value={telefone} />
        <Input label="Email" type="Email" width="30vw" value={email} />
        <Input label="CEP" type="numeric" width="13vw" value={cep} />
        <Input label="UF" type="text" width="13vw" value={uf} />
        <Input label="Endereço" type="text" width="30vw" value={endereco} />
        <Input label="Senha" type="password" width="15vw" value="*****" />
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
