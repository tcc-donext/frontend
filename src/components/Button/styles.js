import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;
  border-radius: 3pt;
  background-color: #e37fd6;
  color: #fff;
  font-size: ${props => props.fontSize || '1.2em'};
  font-weight: 300;

  width: ${props => props.width || '6vw'};
  height: ${props => props.height || '4.75vh'};

  &:hover {
    background-color: #dc61cc;
  }

  &:active {
    background-color: #d952c7;
  }
`;

export default StyledButton;
