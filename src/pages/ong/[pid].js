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

const ongPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [ong, setOng] = useState();
  const [ongCampaigns, setOngCampaigns] = useState();

  useEffect(async () => {
    if (!pid) return;
    const ongFetch = (await api.get(`/ongs/${pid}`)).data[0];

    if (!ongFetch) router.push('/home');

    setOng(ongFetch);
  }, [pid]);

  useEffect(async () => {
    if (!ong) return;
    const campFetch = (await api.get(`/profile/${ong.id_ong}`)).data;

    setOngCampaigns(campFetch);
  }, [ong]);

  return (
    <Container>
      {ong && ongCampaigns && (
        <>
          <OngSection>
            <OngImageContainer>
              <img src={ong.profile_pic} />
              <h1>{ong.nom_ONG}</h1>
            </OngImageContainer>
            <OngInfoContainer>
              <Input
                label="Endereço"
                labelProps={{ fontSize: '1.8em' }}
                value={`${ong.des_endereco} - CEP: ${ong.nro_cep}`}
                width="30vw"
                fontSize="1.5em"
                disabled
              />
              <Input
                label="Email"
                labelProps={{ fontSize: '1.8em' }}
                value={ong.contato.des_email}
                width="30vw"
                fontSize="1.5em"
                disabled
              />
            </OngInfoContainer>
          </OngSection>
          <CampaignSubtitle>
            Campanhas ativas! <span>({ongCampaigns.length}/10)</span>
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
