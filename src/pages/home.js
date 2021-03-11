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
  FilterButtonsContainer,
  FilterButton,
  CampaignsContainer
} from 'styles/pages/home';

import Input from 'components/Input';
import Campaign from 'components/Campaign';

const Home = () => {
  const [campaigns, setCampaigns] = useState();
  const [stringFilter, setStringFilter] = useState('');
  const [filters, setFilters] = useState({
    animal: false,
    pessoas: false,
    natureza: false,
    educacao: false
  });

  const { signed, user } = useAuth();

  useEffect(async () => {
    const campaignsFetch = await api.get('/campanhas');

    setCampaigns(campaignsFetch.data);
  }, []);

  const handleFilterClick = filter => {
    const newFilter = {
      animal: false,
      pessoas: false,
      natureza: false,
      educacao: false
    };
    newFilter[filter] = !filters[filter];

    setFilters(newFilter);
  };

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
          icon="images/search.svg"
          value={stringFilter}
          onChange={event => {
            setStringFilter(event.target.value);
          }}
        />

        <FilterButtonsContainer>
          <FilterButton
            active={filters.animal}
            onClick={() => {
              handleFilterClick('animal');
            }}
          >
            Animais
          </FilterButton>
          <FilterButton
            active={filters.pessoas}
            onClick={() => {
              handleFilterClick('pessoas');
            }}
          >
            Pessoas
          </FilterButton>
          <FilterButton
            active={filters.natureza}
            onClick={() => {
              handleFilterClick('natureza');
            }}
          >
            Natureza
          </FilterButton>
          <FilterButton
            active={filters.educacao}
            onClick={() => {
              handleFilterClick('educacao');
            }}
          >
            Educação
          </FilterButton>
        </FilterButtonsContainer>

        <CampaignsContainer>
          {campaigns &&
            campaigns.map((campaign, i) => {
              console.log(campaign);
              if (
                campaign.des_titulo.toLowerCase().includes(stringFilter) ||
                campaign.des_geral.toLowerCase().includes(stringFilter)
              ) {
                return <Campaign key={i} campaign={campaign} />;
              }
            })}
        </CampaignsContainer>
      </Main>
    </Container>
  );
};

Home.layout = PageLayout;
export default Home;
