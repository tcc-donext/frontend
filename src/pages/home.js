import PageLayout from 'components/layouts/PageLayout';
import { useAuth } from 'contexts/auth';

import {
  Container,
  Header,
  ProfilePicture,
  Logo,
  Main,
  SearchIcon
} from 'styles/pages/home';

import Input from 'components/Input';

const Home = () => {
  const { signed, user } = useAuth();
  console.log(signed, user);

  return (
    <Container>
      <Header>
        <span>
          {signed ? (
            <ProfilePicture
              src={!!user.image ? user.image : '/images/user_placeholder.png'}
              alt={`Foto de perfil de ${user.name}`}
            />
          ) : (
            <ProfilePicture
              src="/images/user_placeholder.png"
              alt="Foto de perfil padrão"
            />
          )}
          <p>Bem vindo(a), {signed ? user.name : 'visitante'}</p>
        </span>
        <Logo src="/images/logo.png" alt="Logo do DoNext" />
      </Header>
      <Main>
        <Input
          label="Pesquisar campanhas"
          padding="2% 5% 2% 4%"
          width="90vw"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <SearchIcon />
        </Input>
      </Main>
    </Container>
  );
};

Home.layout = PageLayout;
export default Home;
