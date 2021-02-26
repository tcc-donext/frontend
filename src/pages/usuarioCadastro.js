
import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from './../contexts/auth';

import FormPageLayout from 'components/layouts/FormPageLayout';
import Link from 'next/link';


import { Container, Image, Divider } from 'styles/pages/usuarioCadastro';
import Button from 'components/Button';
import Input from 'components/Input';

const Registrar = () => {

  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [telefone, setTelefone] = useState();

  const router = useRouter();
  const { signIn } = useAuth();

  return (
    <Container>
      <form>
        <Input 
        label="Nome *" 
        type="text" 
        width="29vw" 
        value={nome}
        onChange={event => {
          setNome(event.target.value);
        }}
        />
        <Input 
        label="Email *" 
        type="Email" 
        width="29vw" 
        value={email}
        onChange={event => {
          setEmail(event.target.value);
        }}
        />
        <Input 
        label="Senha *" 
        type="password" 
        width="14vw"
        value={password}
        onChange={event => {
          setPassword(event.target.value);
        }}
        />
        <Input 
        label="Telefone *" 
        type="text" 
        width="14vw"
        value={telefone}
        onChange={event => {
          setTelefone(event.target.value);
        }}
        />
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
