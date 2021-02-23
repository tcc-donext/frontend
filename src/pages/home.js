import PageLayout from 'components/layouts/PageLayout';
import { useAuth } from 'contexts/auth';

import {
  Container,
  Header,
  Main,
  ProfilePicture,
  Logo
} from 'styles/pages/home';

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
      <Main></Main>
    </Container>
  );
};

Home.layout = PageLayout;
export default Home;
