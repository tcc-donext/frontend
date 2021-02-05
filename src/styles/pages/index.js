import styled from 'styled-components';

export const Header = styled.header`
  padding-top: 6%;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style: none;
  }

  a {
    font-size: 2em;
    font-weight: 300;
    cursor: pointer;
  }

  a:hover {
    color: #555;
  }

  img {
    height: 20vh;
    width: auto;
    margin-top: -10vh;
  }

  button {
    margin-top: -1vh;
  }

  button > a {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
  }

  button > a:hover {
    color: inherit;
  }
`;
export const Footer = styled.footer``;
