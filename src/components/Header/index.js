import styled from 'styled-components';
import Link from 'next/link';

const CustomHeader = ({ children }) => {
  return (
    <StyledHeader>
      {children}
      <Link href="/">
        <img src="/images/logo.png" alt="Logo DoNext" />
      </Link>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;

  h1 {
    color: #3f3d56;
    font-size: 350%;
    font-weight: normal;
    display: inline-flex;
  }

  img {
    display: flex;
    max-height: 11.7%;
    width: auto;
    margin-top: -3.2%;
    margin-right: -0.8%;
  }
`;

export default CustomHeader;
