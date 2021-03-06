import PageLayout from 'components/layouts/PageLayout';
import { useAuth } from 'contexts/auth';

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

// temporario: ate a integração com o backend
const campaigns = [
  {
    id_ong: 6,
    seq_campanha: 1,
    des_titulo: 'Tobias! ASMA',
    des_geral:
      'Ajude o cão Tobias, de 2 semanas de idade, que está com asma e precisando muito de sua ajuda!',
    cod_categoria: 1,
    dat_inicio: '2021-03-02T03:00:00.000Z',
    dat_fim: '2021-06-04T03:00:00.000Z',
    vlr_objetivo: 'R$ 120.000,00',
    vlr_arrecadado: 'R$ 40000,00',
    vlr_pago: 'R$ 0,00'
  },
  {
    id_ong: 6,
    seq_campanha: 2,
    des_titulo: 'Tobias! ASMA DENOVO!',
    des_geral:
      'Ajude o cão Tobias denovo, de 2 semanas de idade, que está com asma e precisando muito de sua ajuda!',
    cod_categoria: 1,
    dat_inicio: '2021-03-02T03:00:00.000Z',
    dat_fim: '2021-06-04T03:00:00.000Z',
    vlr_objetivo: 'R$ 120.000,00',
    vlr_arrecadado: 'R$ 100.000,00',
    vlr_pago: 'R$ 0,00'
  }
];

const Home = () => {
  const { signed, user } = useAuth();

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

        {campaigns.map((campaign, i) => (
          <Campaign key={i} campaign={campaign} />
        ))}
      </Main>
    </Container>
  );
};

Home.layout = PageLayout;
export default Home;
