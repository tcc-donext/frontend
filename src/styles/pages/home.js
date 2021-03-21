import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
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

export const FilterButtonsContainer = styled.div`
  align-self: center;
`;

export const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? '#f6f6f6' : '#fff')};
  color: #6c6b7e;
  font-size: 1.5em;
  font-weight: 300;
  border: none;
  border-radius: 2pt;
  outline: none;
  padding: 15px;
  margin: 0px 15px;
  margin-top: 2vh;
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

export const GereneciarCampanhaContainer = styled.div`
  margin-left: 9vw;
`;
