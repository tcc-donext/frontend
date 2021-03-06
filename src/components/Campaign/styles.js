import styled, { keyframes } from 'styled-components';

export const CampaignContainer = styled.div``;

export const CampaignImage = styled.img``;

export const CampaignTitle = styled.h1``;

export const OngImage = styled.img``;

export const OngData = styled.div``;

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
  background: #eee;
  border-radius: 10pt;
  padding: 0 5px;
  height: 15px;
  width: 500px;
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
