import PageLayout from 'components/layouts/PageLayout';

import PageScroller from 'react-page-scroller';
import { Header, HeaderAnchor, Footer } from 'styles/pages/index';
import Button from 'components/Button';

const Home = () => {
  return (
    <PageScroller>
      <section className="welcome">
        <Header>
          <ul>
            <li>
              <img src="/images/logo.png" alt="Logo DoNext" />
            </li>
            <li>
              <HeaderAnchor>O que é?</HeaderAnchor>
            </li>
            <li>
              <HeaderAnchor>Motivação</HeaderAnchor>
            </li>
            <li>
              <HeaderAnchor>Quem Somos</HeaderAnchor>
            </li>
            <li>
              <HeaderAnchor>Contato</HeaderAnchor>
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
