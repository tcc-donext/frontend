import Link from 'next/link';

import StyledHeader from './styles';

const CustomHeader = ({ title, logo }) => {
  return (
    <StyledHeader>
      <h1>{title}</h1>
      {logo && (
        <Link href="/home">
          <img
            src="/images/logo.png"
            alt="Logo DoNext"
            style={{ cursor: 'pointer' }}
          />
        </Link>
      )}
    </StyledHeader>
  );
};

export default CustomHeader;
