import React, { useState } from 'react';

import PageScroller from 'react-page-scroller';
import { Header, Footer } from 'styles/pages/index';
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
              <Button inverted height="6vh" fontSize="1.5em"><a href="/login">Logar</a></Button>
            </li>
          </ul>
        </Header>
      </section>
      <section className="what">O que é</section>
      <section className="motivation">Motivação</section>
      <section className="who">
        Quem somos
        <Footer>Contato</Footer>
      </section>
    </PageScroller>
  );
};

export default Home;
