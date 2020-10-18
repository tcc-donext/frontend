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
`;

export const Image = styled.img`
  max-height: 72.5vh;
`;
