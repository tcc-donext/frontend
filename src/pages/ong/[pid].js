import { useState, useEffect } from 'react';
import FormPageLayout from 'components/layouts/FormPageLayout';

import {
  Container,
  OngSection,
  OngImageContainer,
  OngInfoContainer,
  CampaignSubtitle,
  CampaignContainer,
  Table,
  Campaign
} from 'styles/pages/ong';
import Input from 'components/Input';
import { useRouter } from 'next/router';
import api from 'services/api';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const campaignsData = [
  {
    imageURL: 'https://picsum.photos/300',
    title: 'Tobias! ASMA',
    total_value: 150,
    target_value: 300,
    donors: 7
  },
  {
    imageURL: 'https://picsum.photos/300',
    title: 'Tobias! ASMA',
    total_value: 150,
    target_value: 300,
    donors: 7
  },
  {
    imageURL: 'https://picsum.photos/300',
    title: 'Tobias! ASMA',
    total_value: 150,
    target_value: 300,
    donors: 7
  },
  {
    imageURL: 'https://picsum.photos/300',
    title: 'Tobias! ASMA',
    total_value: 150,
    target_value: 300,
    donors: 7
  }
];

const ongPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [ong, setOng] = useState();
  const [ongCampaigns, setOngCampaigns] = useState();

  useEffect(async () => {
    if (!pid) return;
    const ongFetch = (await api.get(`/ongs/${pid}`)).data;

    if (!ongFetch[0].length) router.push('/home');

    setOng(ongFetch);
  }, [pid]);

  useEffect(async () => {
    if (!ong) return;
    const campFetch = (await api.get(`/profile/${ong[0][0].id_ong}`)).data;

    setOngCampaigns(campFetch);
  }, [ong]);

  return (
    <Container>
      {ong && ongCampaigns && (
        <>
          <OngSection>
            <OngImageContainer>
              <img src={'https://picsum.photos/300'} />
              <h1>{ong[0][0].nom_ONG}</h1>
            </OngImageContainer>
            <OngInfoContainer>
              <Input
                label="Endereço"
                labelProps={{ fontSize: '1.8em' }}
                value={`${ong[0][0].des_endereco} - CEP: ${ong[0][0].nro_cep}`}
                width="30vw"
                fontSize="1.5em"
                disabled
              />
              <Input
                label="Email"
                labelProps={{ fontSize: '1.8em' }}
                value={ong[1][0].des_email}
                width="30vw"
                fontSize="1.5em"
                disabled
              />
            </OngInfoContainer>
          </OngSection>
          <CampaignSubtitle>
            Campanhas ativas! <span>({campaignsData.length}/10)</span>
          </CampaignSubtitle>
          <CampaignContainer>
            <Table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Arrecadação</th>
                  <th>Data de expiração</th>
                </tr>
              </thead>
              <tbody>
                <OverlayScrollbarsComponent style={{ maxHeight: '22vh' }}>
                  {ongCampaigns.map((campaign, i) => (
                    <div key={i}>
                      {i !== 0 && <tr className="spacer"></tr>}
                      <Campaign>
                        <td>{campaign.des_titulo}</td>
                        <td>
                          {campaign.vlr_arrecadado} / {campaign.vlr_objetivo}
                        </td>
                        <td>
                          {new Date(campaign.dat_fim).getDate() +
                            '/' +
                            (new Date(campaign.dat_fim).getMonth() + 1) +
                            '/' +
                            new Date(campaign.dat_fim).getFullYear()}
                        </td>
                      </Campaign>
                    </div>
                  ))}
                </OverlayScrollbarsComponent>
              </tbody>
            </Table>
          </CampaignContainer>
        </>
      )}
    </Container>
  );
};

ongPage.layout = FormPageLayout;
ongPage.getLayoutConfig = {
  header: {
    title: 'ONG',
    logo: true
  },
  footer: {
    back: true
  }
};

export default ongPage;
