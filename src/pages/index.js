import React from 'react';
import ExampleButton from 'components/ExampleButton';

import { Container } from 'styles/pages/index';

export default function Home() {
  return (
    <Container>
      <h1>Hello World!</h1>
      <ExampleButton>Um Botão exemplo!</ExampleButton>
    </Container>
  );
}
