import FormPageLayout from 'components/layouts/FormPageLayout';

import { Container, Table, Campaign } from 'styles/pages/ong';
import Input from 'components/Input';

const ongPage = () => {
  return (
    <Container>
      <div id="ong">
        <div id="ong-image">
          <img src="https://picsum.photos/300" />
          <h1>Instituto TAMAR</h1>
        </div>
        <div id="ong-info">
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
        </div>
      </div>
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
