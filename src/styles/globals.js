import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }

  body {
    font: 400 16px Roboto, sans-serif;
    background-color: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  html, body {
    height: 100vh;
    width:100vw;
  }
  
  button {
    cursor: pointer;
  }
`;
