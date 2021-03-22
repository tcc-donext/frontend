import FormPageLayout from 'components/layouts/FormPageLayout';
import api from '../services/api';
import { useEffect, useState } from 'react';
import { useAuth } from './../contexts/auth';

import { Container, Image } from 'styles/pages/perfilUsuario.js';
import Button from 'components/Button';
import Input from 'components/Input';

import { useRouter } from 'next/router';

const PerfilUsuario = () => {
  const [idDoador, setIdDoador] = useState();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ddd, setDDD] = useState('');
  const [doacoesCampanha, setDoacoesCampanha] = useState();
  const [doacoesInstituicao, setDoacoesInstituicao] = useState();
  const [loadedAuth, setLoadedAuth] = useState(false);
  const { signed, user, signOut } = useAuth();
  const router = useRouter();

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
        infDoador(user.id);
        setIdDoador(user.id);
      }
    }
  }, [loadedAuth]);

  const infDoador = async id => {
    await api.get(`/doador/${id}`).then(response => {
      const data = response.data[0];
      setNome(data['nom_doador']);
      setEmail(data['des_email']);
      setTelefone(data['nro_telefone']);
      setDDD(data['nro_ddd']);
    });
    await api.get(`/contribuicao/${id}`).then(response => {
      const data = response.data[0];
      setDoacoesCampanha(data['doacoesCampanhas']);
      setDoacoesInstituicao(data['doacoesInstituicoes']);
    });
  };

  const saveUdpatedName = async e => {
    e.preventDefault();
    let data = {};
    await api.get(`/doador/${idDoador}`).then(response => {
      data = response.data[0];
    });
    data['nom_doador'] = nome;
    const result = await api.put(`/doador/${idDoador}`, data);
    // Resultado do update
    // Botar uma mensagem estilizada (Status: 200 -> Deu certo / Status: 400 -> Deu pau)
    if (result.status == '200') alert('Alterado!');
    else if (result.status == '400') alert('Não foi possível alterar o nome!');
  };

  return (
    <Container>
      <form>
        <Input
          label="Nome"
          type="text"
          width="29vw"
          onChange={e => setNome(e.target.value)}
          value={nome}
        />
        <Input
          label="Telefone"
          type="text"
          width="14vw"
          disabled
          readOnly
          value={`(${ddd}) ${telefone}`}
        />
        <Input
          label="Email"
          type="Email"
          width="29vw"
          disabled
          readOnly
          value={email}
        />
        <div className="buttonsContainer">
          <Button
            width="100%"
            height="8vh"
            fontSize="1.8em"
            onClick={saveUdpatedName}
          >
            Salvar
          </Button>
        </div>
      </form>
      <aside>
        <Image
          src="/images/avatar.png"
          alt="Desenho decorativo para a página"
        />
        <h1>{nome}</h1>
        <h2>{doacoesCampanha}</h2>
        <h3>Doado para campanhas</h3>
        <h2>{doacoesInstituicao}</h2>
        <h3>Doado para instituições</h3>
      </aside>
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
