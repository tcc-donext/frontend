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
  font-weight: normal;
`;

export const Table = styled.table``;

export const Campaign = styled.tr``;
