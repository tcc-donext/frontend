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

export const WelcomeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 10vw;
  margin-right: 10vw;
  align-items: center;

  .explain,
  .signupForm {
    display: inline-block;
  }

  .explain {
    color: #5c5a6f;
    width: 45vw;
    font-size: 2.25em;
    font-weight: 300;
    margin-top: -5vh;
  }
`;

export const SignupForm = styled.div`
  padding: 1.5% 2%;
  background-color: #fafafa;
  border-radius: 2%;

  .input {
    padding-bottom: 2vh;
  }

  p {
    padding-top: 15px;
    font-size: 1.2em;
    color: #5c5a6f;

    a {
      color: #656478;
    }
  }
`;

export const Footer = styled.footer``;
