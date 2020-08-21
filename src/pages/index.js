import React from 'react';
import ExampleButton from '../components/ExampleButton';

export default function Home() {
  return (
    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1>Hello World!</h1>
      <ExampleButton>{'Navegar'}</ExampleButton>
    </div>
  );
}
