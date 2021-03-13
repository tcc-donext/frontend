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
  const [loadedAuth, setLoadedAuth] = useState(false);
  const [ongData, setOngData] = useState(null);
  const [ongContatoData, setOngContatoData] = useState(null);
  const [values, setValues] = useState({
    nomeONG: '',
    emailONG: '',
    telefone: '',
    endereco: '',
    CEP: ''
  });

  const { signed, user } = useAuth();
  const router = useRouter();

  const infOng = async id => {
    try {
      const response = await api.get(`/ongs/${id}`);

      setOngData(response.data[0]);
      setOngContatoData(response.data[1]);
    } catch (err) {
      console.warn(`Não foi possível recuperar as informações da Ong. ${err}`);
    }
  };

  function handleChange(ev) {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value
    });
  }

  async function handleSubmit(ev) {
    ev.preventDefault();

    const data = {
      nom_ONG: values.nomeONG,
      des_endereco: values.endereco,
      nro_cep: values.CEP,
      des_email: values.emailONG,
      nro_telefone: values.telefone
    };

    const response = await api.put('ongs', data);

    console.log(response);
  }

  useEffect(() => {
    if (signed != null) {
      setLoadedAuth(true);
    }
  }, [signed]);

  useEffect(() => {
    if (loadedAuth) {
      if (!signed) {
        router.push('/');
      } else {
        infOng(user.id);
      }
    }
  }, [loadedAuth]);

  return (
    <Container>
      {ongData && ongContatoData ? (
        <form>
          <Input
            label="Nome da Ong"
            type="text"
            width="13vw"
            placeholder={ongData[0].nom_ONG}
          />
          <Input label="Senha" type="password" width="13vw" value="*****" />
          <Input
            label="Email"
            type="Email"
            width="30vw"
            placeholder={ongContatoData[0].des_email}
          />
          <Input
            label="CEP"
            type="numeric"
            width="13vw"
            placeholder={ongData[0].nro_cep}
          />
          <Input
            label="Telefone"
            type="text"
            width="13vw"
            placeholder={ongContatoData[0].nro_telefone}
          />
          <Input
            label="Endereço"
            type="text"
            width="30vw"
            placeholder={ongData[0].des_endereco}
          />
          <div className="buttonsContainer">
            <Button width="100%" height="8vh" fontSize="1.8em">
              Salvar
            </Button>
          </div>
        </form>
      ) : null}
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
