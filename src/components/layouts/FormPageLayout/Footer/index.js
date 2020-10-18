import styled from 'styled-components';
import { useRouter } from 'next/router';

import Button from '../../Button';

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Footer = ({ back }) => {
  const router = useRouter();
  return (
    <Container>
      {back && <Button onClick={() => router.back()}>Voltar</Button>}
    </Container>
  );
};

export default Footer;
