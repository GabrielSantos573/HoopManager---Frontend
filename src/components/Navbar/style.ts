import styled from 'styled-components';

type ContainerProps = {
    estado: boolean;
  };

export const Container = styled.div<ContainerProps>`
  background-color: #28478E;
  display: flex;
  flex-direction: column;
  width: ${props => props.estado ? "330px" : "90px"};
  min-height: calc(100vh - 115px);
  /* height: 100%; */
  align-items: start;
  gap: 32px;
  justify-content: start;
  padding: 12px 16px;
  filter: drop-shadow(4px 0px 4px rgba(0, 0, 0, 0.25));
  transition: ease-in-out 200ms;
  position: relative;
  z-index: 2;

  .top {
    width: 90%;
    height: 64px;
  }

  .Voltar {
    position: absolute;
    bottom: 50px;
    left: 20px;
  }
`;

export const NavA = styled.a`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 8px;
    pointer-events: none;

    font-size: 32px;
    text-align: start;
    color: #fff;
    font-weight: 700;
`;