import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;

  }
  h1{
    margin-top: 0.5vh;
    font-size: 1.5em;
    font-weight: 500;
    text-align: center;
    color: #31303b;
    margin-bottom: 5vh;
    }
    h2{
        margin-top: 2vh;
        font-size: 2em;
        font-weight: 400;
        text-align: center;
        color: #31303b;
    }
    h3{
        font-size: 1.65em;
        font-weight: 300;
        text-align: center;
        color: #5c5a6f;
        margin-bottom: 10.5vh;
    }

    .Desconectar{
        display: flex;
        align-items: flex-end;
    }

    .botaoDesconectar{
        margin-top: 6vh;
        text-align: center;
        width: 27vh; 
    }

    .botaoFoto{
        border-top: 10vh;
        height: 42vh;
        width: 42vh;
        border: none;
        margin-top: 6vh;
        border-radius: 22vh;
        padding-left: 5.4vh;
    }

    .logoutIco{
        max-width: 3vh;
        opacity: 0.5;
        margin-right: 5vh;
        
    }

  form {
    position: absolute;
    right: 37%;
    bottom: 
    padding-left: 6vw;

    .input {
      padding-bottom: 2vh;
    }
    .input:nth-child(1) {
      float: left;
      margin-right: 4vw;
    }
    .input:nth-child(4) {
      float: left;
      margin-right: 4vw;
    }
    .input:nth-child(7) {
      padding-bottom: 6vh;
    }
  }

  .buttonsContainer {
    width: 18vw;
    margin-top: 5vw;
  }

  .profileImage {
    height: 42vh;
    width: 42vh;
    margin-top: 6vh;
    border-radius: 22vh;
    padding: 0;
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

export const ImageCentral = styled.img`
  position: absolute;
  left: 60%;
  bottom: 23%;
  z-index: -1;
  max-height: 100vh;
`;

export const ImagePerfil = styled.img`
  max-height: 10vh;
`;

export const Image = styled.img`
  max-height: 100vh;
`;

export const FileInputContainer = styled.label`
  overflow: hidden;
  position: relative;
  [type='file'] {
    cursor: inherit;
    display: block;
    font-size: 999px;
    filter: alpha(opacity=0);
    height: 8vh;
    width: 10vw;
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
  }
  [type='file'] {
    cursor: pointer;
  }
`;
