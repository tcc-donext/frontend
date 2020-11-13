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
  return (
    <Container>
      <OngSection>
        <OngImageContainer>
          <img src="https://picsum.photos/300" />
          <h1>Instituto TAMAR</h1>
        </OngImageContainer>
        <OngInfoContainer>
          <Input
            label="Endereço"
            labelProps={{ fontSize: '1.8em' }}
            value="Salvador, BA"
            width="30vw"
            fontSize="1.5em"
            disabled
          />
          <Input
            label="Email"
            labelProps={{ fontSize: '1.8em' }}
            value="institutotamar@tamar.com"
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
              <th>Doadores</th>
            </tr>
          </thead>
          <tbody>
            <OverlayScrollbarsComponent style={{ maxHeight: '22vh' }}>
              {campaignsData.map((campaign, i) => (
                <div key={i}>
                  {i !== 0 && <tr className="spacer"></tr>}
                  <Campaign>
                    <td>{campaign.title}</td>
                    <td>
                      R$ {campaign.total_value}/{campaign.target_value}
                    </td>
                    <td>{campaign.donors}</td>
                  </Campaign>
                </div>
              ))}
            </OverlayScrollbarsComponent>
          </tbody>
        </Table>
      </CampaignContainer>
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
