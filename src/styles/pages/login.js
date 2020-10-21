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

    .input:nth-child(2) {
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

export const Divider = styled.div`
  display: flex;
  align-items: center;
  color: #9c9c9c;
  font-size: 1.75em;
  font-weight: 300;

  padding-top: 4.75vh;
  padding-bottom: 4.75vh;
  width: 100%;

  ::before,
  ::after {
    content: '';
    flex: 1;
    height: 1px;
  }

  ::before {
    background: linear-gradient(
      to right,
      #9c9c9c 40%,
      rgba(255, 255, 255, 0) 0%
    );
    background-position: left;
    background-size: 10% 1px;
    background-repeat: repeat-x;
  }

  ::after {
    background: linear-gradient(
      to left,
      #9c9c9c 40%,
      rgba(255, 255, 255, 0) 0%
    );
    background-position: right;
    background-size: 10% 1px;
    background-repeat: repeat-x;
  }
`;
