import styled, { css } from 'styled-components';

export default styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;
  border-radius: 3pt;

  ${({ inverted }) =>
    inverted &&
    css`
      border: 2pt solid #e37fd6;
    `};

  background-color: ${({ inverted }) => {
    return inverted ? '#fff' : '#e37fd6';
  }};

  color: ${({ inverted }) => {
    return inverted ? '#e37fd6' : '#fff';
  }};

  font-size: ${props => props.fontSize || '1.2em'};
  font-weight: 300;

  width: ${props => props.width || '6vw'};
  height: ${props => props.height || '4.75vh'};

  &:hover {
    background-color: ${({ inverted }) => {
      return inverted ? '#e37fd6' : '#dc61cc';
    }};
    color: #fff;
  }

  &:active {
    background-color: #d952c7;
  }
`;
