import FormPageLayout from 'components/layouts/FormPageLayout';

import {
  Container,
  OngSection,
  OngImageContainer,
  OngInfoContainer,
  CampaignSubtitle,
  Table,
  Campaign
} from 'styles/pages/ong';
import Input from 'components/Input';

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
      <CampaignSubtitle>Campanhas ativas! (2/10)</CampaignSubtitle>
      <div id="campaigns">
        <Table>
          <Campaign />
        </Table>
      </div>
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
