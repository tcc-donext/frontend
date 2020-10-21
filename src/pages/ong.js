import FormPageLayout from 'components/layouts/FormPageLayout';

import { Container, Table, Campaign } from 'styles/pages/ong';
import Input from 'components/Input';

const ongPage = () => {
  return (
    <Container>
      <div id="ong">
        <img src="https://picsum.photos/500" />
        <h1>Instituto TAMAR</h1>
      </div>
      <div id="ong-info">
        <Input label="Endereço" value="Salvador, BA" disabled />
        <Input label="Email" value="institutotamar@tamar.com" disabled />
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
