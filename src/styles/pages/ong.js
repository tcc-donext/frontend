import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 0.65vh;
`;

export const OngSection = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;

  div {
    display: inline-flex;
    flex-direction: column;
  }
`;

export const OngImageContainer = styled.div`
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
`;

export const OngInfoContainer = styled.div`
  display: flex;
  padding-left: 1vw;

  div:nth-child(1) {
    margin-top: 2.5vh;
    margin-bottom: 3.5vh;
  }
`;

export const CampaignSubtitle = styled.h2`
  font-size: 1.85em;
  font-weight: normal;
  color: #2f2e41;

  margin-top: 6vh;
  margin-left: 7vw;

  span {
    font-size: 0.75em;
    font-weight: 300;
  }
`;

export const CampaignContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-top: 3.5vh;
`;

export const Table = styled.table`
  width: 95%;
  border: 0;
  margin-left: -2.5vw;
  border-collapse: collapse;

  font-size: 1.6em;
  text-align: center;

  thead,
  tbody,
  tr {
    display: table;
    width: 100%;
    table-layout: fixed; /* even columns width , fix width of table too*/
  }

  th {
    font-weight: 300;
    color: #4e4d5d;
  }

  .spacer {
    height: 10px;
  }

  thead {
    margin-bottom: 10px;
  }
`;

export const Campaign = styled.tr`
  background-color: #ebebeb;
  line-height: 10vh;
  border-radius: 4pt; /* 2em 4pt 4pt 2em -> se quiser deixar com a ponta esquerda arredondada */

  td {
    color: #39384a;
    margin-left: -5vw;
  }

  img {
    border-radius: 50%;
    height: 10vh;
  }
`;
