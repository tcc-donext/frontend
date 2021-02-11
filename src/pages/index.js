import React, { useState } from 'react';

import PageScroller from 'react-page-scroller';
import {
  Header,
  Footer,
  WelcomeContainer,
  SignupForm,
  SectionsContainer,
  MotivationContainer
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
        <SectionsContainer background="#fbfbfb">
          <h1>O que é?</h1>
          <img
            src="images/whatis.svg"
            alt="Imagem ilustrativa para a seção de 'O que é?'"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida
            magna nec dui vulputate, id interdum lorem eleifend. Donec ac
            vestibulum odio. Sed mi massa, varius eu neque et, porttitor semper
            nisl. Maecenas faucibus leo metus, vitae laoreet ante dapibus vel.
            Mauris tincidunt tincidunt diam, et cursus justo volutpat a.
          </p>
        </SectionsContainer>
      </section>
      <section className="motivation">
        <SectionsContainer>
          <h1>Motivação</h1>
          <div className="sideby right">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a
              ante nisi. In ullamcorper iaculis nisi, in ullamcorper dui gravida
              ut. Pellentesque quis quam sed nisi molestie tempus. Nulla blandit
              diam libero, non viverra risus semper eget. Etiam dignissim varius
              velit, at tristique orci tincidunt sed. Curabitur luctus sit amet
              purus ut ultricies. Donec ac feugiat arcu, at congue urna. Duis
              fermentum laoreet nulla vel dapibus.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a
              ante nisi. In ullamcorper iaculis nisi, in ullamcorper dui gravida
              ut. Pellentesque quis quam sed nisi molestie tempus. Nulla blandit
              diam libero, non viverra risus semper eget. Etiam dignissim varius
              velit, at tristique orci tincidunt sed. Curabitur luctus sit amet
              purus ut ultricies. Donec ac feugiat arcu, at congue urna. Duis
              fermentum laoreet nulla vel dapibus.
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
