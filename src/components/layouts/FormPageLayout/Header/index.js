import Link from 'next/link';

import StyledHeader from './styles';

const CustomHeader = ({ title, logo }) => {
  return (
    <StyledHeader>
      <h1>{title}</h1>
      {logo && (
        <Link href="/">
          <img src="/images/logo.png" alt="Logo DoNext" />
        </Link>
      )}
    </StyledHeader>
  );
};

export default CustomHeader;
