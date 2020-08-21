import React from 'react';
import Link from 'next/link';
import { Button } from './styles';

export default function ExampleButton(props) {
  return (
    <Link href="testpage">
      <Button {...props} />
    </Link>
  );
}
