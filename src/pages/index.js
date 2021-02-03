import PageLayout from 'components/layouts/PageLayout';

import { Header, HeaderAnchor, Main, Footer } from 'styles/pages/index';
import Button from 'components/Button';

const Home = () => {
  return (
    <>
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
      <Main></Main>
      <Footer></Footer>
    </>
  );
};

Home.layout = PageLayout;

export default Home;
