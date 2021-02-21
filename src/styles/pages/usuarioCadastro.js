import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;

  aside {
    display: inline-flex;
    position: absolute;
    right: 2.75vw;
    bottom: 16vh;

    @media (max-width: 850px) {
      display: none;
    }
  }

  form {
    padding-left: 6vw;
    padding-top: 4vh;

    .input {
      padding-bottom: 3.5vh;
    }
    .input:nth-child(3) {
        float:left;
        margin-right: 2vh;
      }
    .input:nth-child(4) {
        float:left;
      padding-bottom: 6vh;
    }
  }

  .buttonsContainer {
    width: 18.75vw;
  }

  p {
    margin-top: 3.3vh;
    font-size: 1.35em;
    font-weight: 300;
    text-align: center;
    color: #5c5a6f;

    a {
      color: #656478;
    }
  }
`;

export const Image = styled.img`
  max-height: 72.5vh;
`;


