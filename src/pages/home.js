import { useState, useEffect } from 'react';
import PageLayout from 'components/layouts/PageLayout';
import { useAuth } from 'contexts/auth';
import api from 'services/api';

import {
  Container,
  Header,
  ProfilePicture,
  Logo,
  Main,
  SearchIcon,
  FilterButtonsContainer,
  FilterButton
} from 'styles/pages/home';

import Input from 'components/Input';
import Campaign from 'components/Campaign';

const Home = () => {
  const [campaigns, setCampaigns] = useState();
  const { signed, user } = useAuth();

  useEffect(async () => {
    const campaignsFetch = await api.get('/campanhas');

    setCampaigns(campaignsFetch.data);
  }, []);

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
        <FilterButtonsContainer>
          <FilterButton>Animais</FilterButton>
          <FilterButton>Pessoas</FilterButton>
          <FilterButton>Natureza</FilterButton>
          <FilterButton>Educação</FilterButton>
        </FilterButtonsContainer>

        {campaigns &&
          campaigns.map((campaign, i) => (
            <Campaign key={i} campaign={campaign} />
          ))}
      </Main>
    </Container>
  );
};

Home.layout = PageLayout;
export default Home;
