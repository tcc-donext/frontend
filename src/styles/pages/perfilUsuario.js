import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;

  aside {
    display: inline;
    position: absolute;
    left: 25%;
    top: 25%;
    bottom: 16vh;
    text-align: center;

    @media (max-width: 850px) {
      display: none;
    }
  }
  h1 {
    margin-top: 0.5vh;
    font-size: 1.5em;
    font-weight: 500;
    text-align: center;
    color: #31303b;
    margin-bottom: 5vh;
  }
  h2 {
    margin-top: 2vh;
    font-size: 2em;
    font-weight: 400;
    text-align: center;
    color: #31303b;
  }
  h3 {
    font-size: 1.15em;
    font-weight: 300;
    text-align: center;
    color: #5c5a6f;
  }

  .Desconectar {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .botaoDesconectar {
    text-align: center;
    width: 25vh;
  }

  .logoutIco {
    max-width: 3vh;
    opacity: 0.5;
    margin-right: 5vh;
  }

  form {
    display: inline;
    position: absolute;
    right: 20%;
    padding-left: 6vw;
    padding-top: 4vh;

    .input {
      padding-bottom: 2vh;
    }
    .input:nth-child(3) {
      margin-right: 2vh;
    }
    .input:nth-child(4) {
      padding-bottom: 6vh;
    }
  }

  .buttonsContainer {
    width: 29vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .deleteButton {
    background-color: white;
    /* border: 0.1vh solid #e37fd6; */
  }

  .deleteImage {
    filter: invert(85%) sepia(26%) saturate(5776%) hue-rotate(247deg)
      brightness(96%) contrast(83%);
  }

  .deleteButton:hover .deleteImage {
    filter: invert(22%) sepia(69%) saturate(6095%) hue-rotate(339deg)
      brightness(91%) contrast(104%);
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
  max-height: 25vh;
`;

export const DelImage = styled.img`
  max-height: 5vh;
`;
