import FormPageLayout from 'components/layouts/FormPageLayout';

const ongPage = () => {
  return <div style={{ display: 'flex', flex: 1 }}></div>;
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
