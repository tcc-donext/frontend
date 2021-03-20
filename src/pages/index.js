import React, { useState } from 'react';

import PageScroller from 'react-page-scroller';
import {
  Header,
  Footer,
  WelcomeContainer,
  SignupForm,
  SectionsContainer
} from 'styles/pages/index';
import Input from 'components/Input';
import Button from 'components/Button';
import api from 'services/api';
import { useRouter } from 'next/router';

import { useAuth } from './../contexts/auth';

const Home = () => {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [ddd, setDDD] = useState();
  const [telefone, setTelefone] = useState();

  const router = useRouter();
  const { signIn } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);

  async function Submit(e) {
    e.preventDefault();

    const data = {
      nom_doador: nome,
      des_email: email,
      nro_ddd: ddd,
      nro_telefone: telefone,
      des_senha: password
    };

    try {
      const response = await api.post('doador', data);
      console.log(response);

      const success = await signIn(email, password);
      if (success) window.location.href = '/home';
      else {
        window.location.href = '/usuarioCadastro';
      }
    } catch (error) {
      alert('Não foi possivel realizar o cadastro!');
    }
  }

  return (
    <PageScroller
      pageOnChange={setCurrentPage}
      customPageNumber={currentPage}
      renderAllPagesOnFirstRender
    >
      <section className="welcome">
        <Header>
          {/* prettier-ignore */}
          <ul>
            <li>
              <img src="/images/logo.png" alt="Logo DoNext" />
            </li>
            <li>
              <a onClick={() => {setCurrentPage(1)}}>O que é?</a>
            </li>
            <li>
              <a onClick={() => {setCurrentPage(2)}}>Motivação</a>
            </li>
            <li>
              <a onClick={() => {setCurrentPage(3)}}>Quem somos</a>
            </li>
            <li>
              <a onClick={() => {setCurrentPage(3)}}>Contato</a>
            </li>
            <li>
              <Button inverted height="6vh" fontSize="1.5em" onClick={() => { window.location.href = "/login" }}>Logar</Button>
            </li>
          </ul>
        </Header>
        <WelcomeContainer>
          <p className="explain">
            O <b>Donext</b> é uma aplicação criada para ações de caridade que
            conecta quem precisa de doação com quem quer doar!
          </p>
          <SignupForm className="signupForm">
            <form onSubmit={Submit}>
              <Input
                label="Nome *"
                width="22vw"
                type="text"
                value={nome}
                onChange={event => {
                  setNome(event.target.value);
                }}
              />
              <Input
                label="Email *"
                type="email"
                width="22vw"
                value={email}
                onChange={event => {
                  setEmail(event.target.value);
                }}
              />
              <span>
                <Input
                  label="Senha *"
                  type="password"
                  width="22vw"
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                />
                <Input
                  label="DDD *"
                  type="text"
                  width="4vw"
                  type="text"
                  value={ddd}
                  onChange={event => {
                    setDDD(event.target.value);
                  }}
                />
                <Input
                  label="Telefone *"
                  type="text"
                  width="22vw"
                  pattern="[0-9]{9}"
                  type="text"
                  value={telefone}
                  onChange={event => {
                    setTelefone(event.target.value);
                  }}
                />
              </span>

              <Button type="submit" height="6vh" width="12vw" fontSize="1.5em">
                Cadastre-se
              </Button>
            </form>
            <p>
              É uma ong? <a href="./ongCadastro">Cadastre-se aqui</a>
            </p>
          </SignupForm>
        </WelcomeContainer>
      </section>
      <section className="what">
        <SectionsContainer background="#fbfbfb">
          <h1>O que é?</h1>
          <img
            src="images/whatis.svg"
            alt="Imagem ilustrativa para a seção de 'O que é?'"
          />
          <p text-align="center">
            Donext é um sistema que visa tornar mais fácil a conexão entre
            instituições de caridade e doadores. Na plataforma a interação pode
            ser feita de maneira mais direcionada e fácil, onde as pessoas podem
            encontrar aquilo que buscam ajudar de maneira intuitiva. Além disso,
            as ONGs podem criar campanhas onde estabelecem metas diretas sobre
            situações e condições que necessitem de apoio externo.
          </p>
        </SectionsContainer>
      </section>
      <section className="motivation">
        <SectionsContainer>
          <h1>Motivação</h1>
          <div className="sideby right">
            <p>
              No Brasil existem muitas instituições com causas beneficentes que
              necessitam de apoio financeiro para arcar com os processos
              internos. Vemos muitas pessoas divulgando seus trabalhar nas redes
              sociais, principalmente. Com isso, o sistema Donext tem como
              Motivação unir em um só lugar essas instituições de forma
              intuitiva ao usuário, facilitando a navegação e a busca pelo que
              se precisa achar.
            </p>
            <img
              src="images/motivation.svg"
              alt="Imagem ilustrativa para a seção de 'O que é?'"
            />
          </div>
        </SectionsContainer>
      </section>
      <section className="who">
        <SectionsContainer background="#fbfbfb" height="80vh" imgHeight="45vh">
          <h1>Quem somos</h1>
          <div className="sideby left">
            <img
              src="images/whois.svg"
              alt="Imagem ilustrativa para a seção de 'O que é?'"
            />
            <p>
              Alunos do Centro Federal de Educação Tecnológica de Minas Gerais,
              desenvolvedores que buscam tornar as demandas vistas no mundo
              atual em sistemas funcionais com tecnologias novas. Grupo que
              busca crescer em conjunto enquanto produz programas que trazem
              soluções lógicas a problemas cotidianos.
            </p>
          </div>
        </SectionsContainer>
        <Footer>
          <p>
            Dúvidas?
            <br />
            Envie-nos um e-mail
            <br />
            <a href="mailto:contato@donext.com">contato@donext.com</a>
          </p>
          <span>
            <p>Desenvolvido por equipe Donext © 2020</p>
          </span>
        </Footer>
      </section>
    </PageScroller>
  );
};

export default Home;
