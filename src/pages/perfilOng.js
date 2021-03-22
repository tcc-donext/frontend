import { useState, useEffect } from 'react';
import api from 'services/api';
import { useAuth, ong } from './../contexts/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

import FormPageLayout from 'components/layouts/FormPageLayout';
import {
  Container,
  Image,
  ImageCentral,
  ImagePerfil,
  FileInputContainer
} from 'styles/pages/perfilOng.js';
import Button from 'components/Button';
import Input from 'components/Input';

const PerfilOng = () => {
  const [loadedAuth, setLoadedAuth] = useState(false);
  const [ongData, setOngData] = useState(null);
  const [ongContatoData, setOngContatoData] = useState(null);
  const [values, setValues] = useState({
    nom_ONG: '',
    des_endereco: '',
    nro_cep: '',
    des_email: '',
    nro_telefone: ''
  });

  const { signed, user, signOut } = useAuth();
  const router = useRouter();

  const infOng = async id => {
    try {
      const response = await api.get(`/ongs/${id}`);

      setOngData(response.data[0]);
      setOngContatoData(response.data[0].contato);
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

  async function salvarPerfil(id) {
    const data = {
      nom_ONG: values.nom_ONG,
      des_endereco: values.des_endereco,
      nro_cep: values.nro_cep,
      des_email: values.des_email,
      nro_telefone: values.nro_telefone
    };

    try {
      const ong = await api.get(`/ongs/${id}`);
      if (data.nom_ONG == '') data.nom_ONG = ong.data[0].nom_ONG;

      if (data.des_endereco == '') data.des_endereco = ong.data[0].des_endereco;

      if (data.nro_cep == '') {
        data.nro_cep = ong.data[0].nro_cep;
      } else {
        data.nro_cep = parseInt(data.nro_cep);
      }

      if (data.des_email == '') data.des_email = ong.data[0].contato.des_email;

      if (data.nro_telefone == '') {
        data.nro_telefone = ong.data[0].contato.nro_telefone;
      } else {
        data.nro_telefone = parseInt(data.nro_telefone);
      }

      const response = await api.put(`/profile/${id}`, data);
      console.log(response);
    } catch (err) {
      console.warn(`Não foi possível atualizar as informações da Ong. ${err}`);
    }
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

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('/images/ebebeb.jpg');
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <Container>
      {ongData && ongContatoData ? (
        <div>
          <form>
            <Input
              name="nom_ONG"
              label="Nome da Ong"
              type="text"
              width="13vw"
              onChange={handleChange}
              placeholder={ongData.nom_ONG}
            />
            <Input label="Senha" type="password" width="13vw" value="*****" />
            <Input
              name="des_email"
              label="Email"
              type="Email"
              width="30vw"
              onChange={handleChange}
              placeholder={ongContatoData.des_email}
            />
            <Input
              name="nro_cep"
              label="CEP"
              type="numeric"
              width="13vw"
              onChange={handleChange}
              placeholder={ongData.nro_cep}
            />
            <Input
              name="nro_telefone"
              label="Telefone"
              type="text"
              width="13vw"
              onChange={handleChange}
              placeholder={ongContatoData.nro_telefone}
            />
            <Input
              name="des_endereco"
              label="Endereço"
              type="text"
              width="30vw"
              onChange={handleChange}
              placeholder={ongData.des_endereco}
            />
            <div className="buttonsContainer">
              <Button
                width="100%"
                height="8vh"
                fontSize="1.8em"
                onClick={() => salvarPerfil(ongData.id_ong)}
              >
                Salvar
              </Button>
            </div>
          </form>
          <div>
            <div className="buttonsImage">
              <Input
                className="profileImage"
                type="image"
                src={signed && user.image ? user.image : '/images/avatar.png'}
                alt="Imagem para alterar foto de perfil"
              ></Input>
              <FileInputContainer>
                Clique para alterar a foto
                <input
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                />
              </FileInputContainer>
            </div>
            <span className="Desconectar">
              <Button
                className="botaoDesconectar"
                onClick={async event => {
                  event.preventDefault();
                  const success = await signOut();
                  if (success) router.push('/home');
                }}
              >
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
        </div>
      ) : null}
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
