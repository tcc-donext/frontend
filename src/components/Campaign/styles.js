import styled, { keyframes } from 'styled-components';

export const CampaignContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  width: fit-content;
`;

export const CampaignImage = styled.img`
  height: 38vh;
  width: 28vw;
  object-fit: cover;
`;

export const CampaignTitle = styled.h1`
  font-weight: 400;
  color: #403e4d;
`;

export const OngImage = styled.img`
  height: 8vh;
  width: 8vh;
  border-radius: 50%;
  display: inline;
`;

export const OngNoImage = styled.div`
  height: 8vh;
  width: 8vh;
  border-radius: 50%;

  background-color: #7cffcb;
  background-image: linear-gradient(315deg, #7cffcb 0%, #74f2ce 74%);
`;

export const ContentSection = styled.div`
  padding: 15px 25px;

  .valueLabel {
    text-align: center;
  }
`;

export const OngData = styled.div`
  font-size: 1.2em;
  color: #2f2e41;
  padding-left: 10px;

  span {
    font-size: 0.8em;
  }
`;

export const OngSection = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 15px 0%;
`;

export const ProgressBar = ({ goal, current }) => (
  <ProgressDiv>
    <ProgressValue barWidth={(current / goal) * 100} />
  </ProgressDiv>
);

const ProgressDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  background: #fff;
  border-radius: 10pt;
  padding: 0 5px;
  height: 15px;
  width: 25vw;
`;

const load = barWidth => keyframes`
    0% { width: 0; }
    100% { width: ${barWidth}%; }
`;

const ProgressValue = styled.div`
  animation: ${props => load(props.barWidth)} 3s normal forwards;
  border-radius: 100px;
  background: #7fe38c;
  height: 10px;
  width: 20%;
`;
