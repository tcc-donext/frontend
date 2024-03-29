import { useState, useEffect } from 'react';
import PageLayout from 'components/layouts/PageLayout';
import { useAuth } from 'contexts/auth';
import api from 'services/api';
import { useRouter } from 'next/router';

import {
  Container,
  Header,
  ProfilePicture,
  Logo,
  Main,
  FilterButtonsContainer,
  FilterButton,
  CampaignsContainer,
  GereneciarCampanhaContainer
} from 'styles/pages/home';

import Input from 'components/Input';
import Button from 'components/Button';
import Campaign from 'components/Campaign';

const Home = () => {
  const router = useRouter();
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
              style={{ cursor: 'pointer' }}
              src={!!user.image ? user.image : '/images/user_placeholder.png'}
              alt={`Foto de perfil de ${user.name}`}
              onClick={() =>
                user.isOng
                  ? router.push('/perfilOng')
                  : router.push('/perfilUsuario')
              }
            />
          ) : (
            <ProfilePicture
              style={{ cursor: 'pointer' }}
              src="/images/user_placeholder.png"
              alt="Foto de perfil padrão"
            />
          )}
          <p>Bem vindo(a), {signed ? user.name : 'visitante'}</p>
          {signed && user.isOng ? (
            <GereneciarCampanhaContainer>
              <Button
                width="13vw"
                onClick={() => router.push('/GerenciarCampanha')}
              >
                Gerenciar Campanhas
              </Button>
            </GereneciarCampanhaContainer>
          ) : null}
          {!signed ? (
            <GereneciarCampanhaContainer>
              <Button width="13vw" onClick={() => router.push('/login')}>
                Logar
              </Button>
            </GereneciarCampanhaContainer>
          ) : null}
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
              const hasFilters =
                filters.animal ||
                filters.educacao ||
                filters.natureza ||
                filters.pessoas;

              if (
                (campaign.des_titulo
                  .toLowerCase()
                  .includes(stringFilter.toLocaleLowerCase()) ||
                  campaign.des_geral.toLowerCase().includes(stringFilter)) &&
                (!hasFilters ||
                  (filters.animal && campaign.cod_categoria === 1) ||
                  (filters.pessoas && campaign.cod_categoria === 2) ||
                  (filters.natureza && campaign.cod_categoria === 3) ||
                  (filters.educacao && campaign.cod_categoria === 4))
              ) {
                if (new Date() <= new Date(campaign.dat_fim)) {
                  return <Campaign key={i} campaign={campaign} />;
                }
              }
            })}
        </CampaignsContainer>
      </Main>
    </Container>
  );
};

Home.layout = PageLayout;
export default Home;
