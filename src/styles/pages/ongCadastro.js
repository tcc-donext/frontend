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
`
export const Image = styled.img`
  max-height: 72.5vh;
`;

export const Tabs = styled.div`
display:flex
flex-direction: column;
padding-top: 8vh;
padding-left: 6vw;
`

export const TabsLabel = styled.div`
display: flex;
flex: 1;
justify-content: space-between;

`
export const H1Container = styled.div`
h1{
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center
 }
 h1:after{
  content:' ';
  margin-top: 0.5vh;
  display:block;
  width: 8.5vw;
  height: 0.5vh;
  background-color: ${props => props.background};
 }
`
export const ButtonContainer = styled.div`
Button {
  float: right;
  margin-top: ${props => props.padding}
}
`

export const TabsForm = styled.form`
padding-top: 4vh;
  .input {
    padding-bottom: 3.5vh;
  }
  Button {
    float: right;
  }
`
export const Row = styled.div`
display:flex;
flex-direction: row;
  .input:nth-child(2){
    margin-left: 2vw;
  }
`

export const HiddenBox = styled.div`
  display: none;
`

export const TabChangeButton = styled.button`
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
