import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  margin-top: 0.65vh;

  #ong {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;

    div {
      display: inline-flex;
      flex-direction: column;
    }
  }

  #ong-image {
    align-items: center;
    padding-right: 3vw;

    h1 {
      padding-top: 2.25vh;
      font-size: 2.5em;
      color: #3f3d56;
      font-weight: normal;
    }

    img {
      border-radius: 50%;
      width: 11vw;
      height: auto;
    }
  }

  #ong-info {
    display: flex;
    padding-left: 1vw;

    div:nth-child(1) {
      margin-top: 2.5vh;
      margin-bottom: 3.5vh;
    }
  }
`;

export const Table = styled.table``;

export const Campaign = styled.tr``;
