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

export const Main = styled.div``;
