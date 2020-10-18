import { Container } from './styles';

import Header from './Header';
import Footer from './Footer';

export default function FormPageLayout({ config, children }) {
  return (
    <Container>
      {config.header && <Header {...config.header} />}
      {children}
      {config.footer && <Footer {...config.footer} />}
    </Container>
  );
}
