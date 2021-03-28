import { useState, useEffect } from 'react';
import api from 'services/api';
import { useAuth, ong } from './../contexts/auth';
import { login } from 'services/auth';
import { useRouter } from 'next/router';

import Modal from 'react-modal';
const ModalStyles = {
  content: {
    position: 'absolute',
    top: '21vh',
    left: '35.9vw',
    right: '35.9vw',
    bottom: '21vh',
    backgroundColor: '#f6f6f6',
    zIndex: '3'
  }
};

import FormPageLayout from 'components/layouts/FormPageLayout';
import { DelImage } from 'styles/pages/perfilUsuario.js';
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [valuesDel, setValuesDel] = useState({
    email: '',
    senha: ''
  });
  const [values, setValues] = useState({
    nom_ONG: '',
    des_endereco: '',
    nro_cep: '',
    des_email: '',
    nro_telefone: ''
  });

  const { signed, user, signOut } = useAuth();
  const router = useRouter();
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState(
    signed && user.image ? user.image : '/images/avatar.png'
  );
  const [selectedFile, setSelectedFile] = useState(null);

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

  function handleChangeDel(ev) {
    setValuesDel({
      ...valuesDel,
      [ev.target.name]: ev.target.value
    });
    console.log(valuesDel);
  }

  const setLocalStorageData = async data => {
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const SubmitData = async info => {
    try {
      const response = await api.put(`/ongs`, info);
      let data = {
        id: response.data.id_ong,
        name: response.data.nom_ONG,
        image: response.data.link_foto_perfil,
        isOng: true
      };
      setLocalStorageData(data);
      router.reload();
    } catch (err) {
      console.warn(`Não foi possível atualizar as informações da Ong. ${err}`);
    }
  };

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

      if (selectedFile == null) {
        data.img_ong = '';
        SubmitData(data);
        return;
      }

      const reader = new FileReader();

      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        data.img_ong = reader.result;
        SubmitData(data);
      };
      reader.onerror = () => {
        console.error('AHHHHHHHH!!');
        setErrMsg('something went wrong!');
      };
    } catch (err) {
      console.log(err);
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
        if (user.image != '') {
          setPreviewSource(user.image);
        }
      }
    }
  }, [loadedAuth]);

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

  function closeModal() {
    setModalIsOpen(false);
  }

  function OpenModal() {
    setModalIsOpen(true);
  }

  const handleDeleteAccount = async e => {
    e.preventDefault();
    setModalIsOpen(true);
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
                onClick={e => {
                  e.preventDefault();
                  salvarPerfil(ongData.id_ong);
                }}
              >
                Salvar
              </Button>
            </div>
          </form>
          <div>
            <div className="buttonsImage">
              {user && user.image ? (
                <Input
                  className="profileImage"
                  type="image"
                  src={previewSource}
                  alt="Imagem para alterar foto de perfil"
                ></Input>
              ) : (
                <Input
                  className="profileImage"
                  type="image"
                  src="/images/avatar.png"
                  alt="Imagem para alterar foto de perfil"
                ></Input>
              )}
              <FileInputContainer style={{ marginLeft: '5vw' }}>
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
              <span style={{ margin: '12vh 0 0 3vw' }}>
                <Button
                  className="deleteButton"
                  width="5.1vh"
                  height="5.1vh"
                  fontSize="1.5em"
                  onClick={handleDeleteAccount}
                >
                  <DelImage
                    src="/images/trash.svg"
                    className="deleteImage"
                  ></DelImage>
                </Button>
              </span>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalStyles}
      >
        <h2 style={{ color: 'red', paddingBottom: '1.5vh' }}>
          Deseja realmente excluir a sua conta?
        </h2>
        <h3>Para isso, precisamos que confirme seu Email e Senha:</h3>
        <div>
          <form>
            <div style={{ paddingBottom: '3.5vh', paddingTop: '3.5vh' }}>
              <Input
                name="email"
                label="Email"
                type="text"
                width="20vw"
                onChange={handleChangeDel}
              />
            </div>
            <div style={{ paddingBottom: '3.5vh' }}>
              <Input
                name="senha"
                label="Senha"
                type="password"
                width="20vw"
                onChange={handleChangeDel}
              />
            </div>
            <div className="buttonsContainer">
              <Button
                width="30%"
                height="6vh"
                fontSize="1.5em"
                onClick={async event => {
                  event.preventDefault();
                  let success = false;
                  /*const success = await api.post('/login', {
                    des_email: valuesDel.email,
                    des_senha: valuesDel.password
                  });*/
                  if (success) alert('Deletado');
                  else {
                    alert('Email ou Senha incorretos! 🤔');
                  }
                }}
              >
                Deletar
              </Button>
            </div>
          </form>
        </div>
      </Modal>
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
