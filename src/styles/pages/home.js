import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  width: 100vw;
  justify-content: space-between;
  padding: 0 10vw;

  span {
    display: inline-flex;
    align-items: center;
  }

  span > p {
    display: inline;
    padding-left: 20px;
    font-size: 1.5em;
    color: #2f2e41;
  }
`;

export const ProfilePicture = styled.img`
  height: 8vh;
  border-radius: 50%;
`;

export const Logo = styled.img`
  display: inline-flex;
  height: 15vh;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;

  .input {
    align-self: center;
  }
`;

export const SearchIcon = styled.div`
  color: #403e4d;
  position: absolute;
  margin-left: 20px;
  margin-bottom: -40px;
  width: 20px;
  height: 20px;
  border: solid 2px currentColor;
  border-radius: 100%;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);

  :before {
    content: '';
    position: absolute;
    top: 18px;
    left: 8px;
    height: 10px;
    width: 2px;
    background-color: currentColor;
  }
`;

export const FilterButtonsContainer = styled.div`
  align-self: center;
`;

export const FilterButton = styled.button`
  background-color: #fff;
  color: #6c6b7e;
  font-size: 1.5em;
  font-weight: 300;
  border: none;
  border-radius: 2pt;
  outline: none;
  padding: 15px;
  margin: 0px 15px;
  margin-top: 2vh;

  :active {
    background-color: #f6f6f6;
  }
`;

export const CampaignsContainer = styled.div`
  align-self: center;
  display: grid;
  grid-template-columns: 28vw 28vw 28vw;
  grid-template-rows: auto;
  column-gap: 50px;
  row-gap: 50px;

  background-color: #fff;
  padding: 20px 60px;
`;
