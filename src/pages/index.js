import { useState } from 'react';
import PageLayout from 'components/layouts/PageLayout';

import PageScroller from 'react-page-scroller';
import { Header, Footer } from 'styles/pages/index';
import Button from 'components/Button';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <PageScroller pageOnChange={setCurrentPage} customPageNumber={currentPage}>
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
              <Button>Logar</Button>
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

Home.layout = PageLayout;

export default Home;
