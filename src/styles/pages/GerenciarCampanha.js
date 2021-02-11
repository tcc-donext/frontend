import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  flex: 1;
  margin-top: 0.65vh;
`;
export const ImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 5px;
  padding-right: 5px;
  img{
    height: ${props => props.size};
  }
`;
export const Card = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  width: 14vw;
  height: 20vh;
  background-color: #f9fafd;
  text-align: center;
  justify-content: space-between;
  padding-bottom: 5vh;
`;

export const CardContainer = styled.div`
  display: flex;
`;

export const ImgContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  img{
    width:4vw;
  }
`;
export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
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

export const AddCampaing = styled.div`
  height: 65px;
  width: 65px;
  border-radius: 50%;
  border:2px solid black;
`

export const AddCampaingContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1vh;
`

export const ImgContainerCenterColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  align-items: center;
  img{
    width:1.1vw;
  }
`;

