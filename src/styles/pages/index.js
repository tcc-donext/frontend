import styled from 'styled-components';

export const Header = styled.header`
  padding-top: 12vh;
  padding-left: 2vw;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style: none;
  }

  li > a {
    font-size: 2em;
    font-weight: 300;
    cursor: pointer;
  }

  img {
    height: 20vh;
    width: auto;
    margin-top: -10vh;
  }

  button {
    margin-top: -1vh;
  }
`;
export const Footer = styled.footer``;
