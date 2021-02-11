import React, { useState } from 'react';

import PageScroller from 'react-page-scroller';
import {
  Header,
  Footer,
  WelcomeContainer,
  SignupForm,
  WhatContainer
} from 'styles/pages/index';
import Input from 'components/Input';
import Button from 'components/Button';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);

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
            <Input label="Nome *" width="22vw" />
            <Input label="Email *" type="email" width="22vw" />
            <span>
              <Input label="Senha *" type="password" width="22vw" />
              <Input
                label="Telefone *"
                type="tel"
                width="22vw"
                pattern="[0-9]{11}"
              />
            </span>

            <Button height="6vh" width="12vw" fontSize="1.5em">
              Cadastre-se
            </Button>
            <p>
              É uma ong? <a href="">Cadastre-se aqui</a>
            </p>
          </SignupForm>
        </WelcomeContainer>
      </section>
      <section className="what">
        <WhatContainer>
          <h1>O que é?</h1>
          <img
            src="images/heart.png"
            alt="Imagem ilustrativa para a seção de 'O que é?'"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida
            magna nec dui vulputate, id interdum lorem eleifend. Donec ac
            vestibulum odio. Sed mi massa, varius eu neque et, porttitor semper
            nisl. Maecenas faucibus leo metus, vitae laoreet ante dapibus vel.
            Mauris tincidunt tincidunt diam, et cursus justo volutpat a.
          </p>
        </WhatContainer>
      </section>
      <section className="motivation">Motivação</section>
      <section className="who">
        Quem somos
        <Footer>Contato</Footer>
      </section>
    </PageScroller>
  );
};

export default Home;
