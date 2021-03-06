import FormPageLayout from 'components/layouts/FormPageLayout';
import Link from 'next/link';
import api from '../services/api';
import { useEffect, useState } from 'react';

import { Container, Image, Divider } from 'styles/pages/perfilUsuario.js';
import Button from 'components/Button';
import Input from 'components/Input';



const PerfilUsuario = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ddd, setDDD] = useState('');
  
  useEffect(() => {

    api.get('/doador/1').then((response) => {
      const data = response.data[0];
      setNome(data['nom_doador']);
      setEmail(data['des_email']);
      setTelefone(data['nro_telefone'])
      setDDD(data['nro_ddd']);
      console.log(data);
    })
  }, []);

  return (
    <Container>
      <form>
        <Input label="Nome" type="text"  width="29vw"  onChange={(e) => setNome(e.target.value)} value={nome}  />
        <Input label="Telefone" type="text"  width="14vw" disabled readOnly value={`(${ddd}) ${telefone}`} />
        <Input label="Email" type="Email"  width="29vw" disabled readOnly value={email} />
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
      <Button className="botaoDesconectar" onClick={async event => {
              event.preventDefault();
              const success = await logout();
              if (success) router.push('/home');
            }}><Image className="logoutIco" src="/images/logout.png"
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