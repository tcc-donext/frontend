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

export const SectionsContainer = styled.div`
  display: flex;
  flex: 1;
  height: ${props => props.height || '100vh'};
  padding-left: 10vw;
  padding-right: 10vw;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${props => props.background || '#FFF'};

  h1 {
    font-size: 3.5em;
    font-weight: 400;
    color: #3f3d56;
  }

  p {
    font-size: 2.25em;
    font-weight: 300;
    color: #2f2e3b;
  }

  img {
    height: ${props => props.imgHeight || '40vh'};
    width: auto;
  }

  .sideby {
    display: grid;
    grid-column-gap: 10vw;
    margin-top: -10vh;
  }

  .right {
    grid-template-columns: 1.5fr 0.5fr;
  }

  .left {
    grid-template-columns: 0.5fr 1.5fr;
  }
`;

export const Footer = styled.footer`
  height: 20vh;
  background-color: #2f2e41;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;

  p {
    color: #fbfbfb;
    font-size: 1.6em;
    font-weight: 300;

    a {
      text-decoration: underline;
      color: inherit;
    }
  }

  span {
    p {
      font-size: 1.25em;
    }
  }
`;
