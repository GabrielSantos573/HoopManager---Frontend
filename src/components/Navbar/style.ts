import styled from "styled-components";

type ContainerProps = {
  estado: boolean;
};

export const Container = styled.div<{ estado: boolean }>`
  background: linear-gradient(90deg, #ff6200 0%, #161618 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: ${(props) => (props.estado ? "330px" : "90px")};
  min-height: calc(100vh - 115px);
  padding: 20px 10px;
  gap: 16px;
  box-shadow: 4px 0px 6px rgba(0, 0, 0, 0.3); /* Se causar borda, remova ou ajuste */
  transition: width 0.3s ease-in-out;
  position: relative;
  z-index: 2;
`;


export const NavA = styled.a<{ estado?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${(props) => (props.estado ? "12px" : "8px")};
  padding: ${(props) => (props.estado ? "10px 16px" : "8px 12px")};
  overflow: hidden;
  width: 100%;
  font-size: ${(props) => (props.estado ? "16px" : "14px")};
  text-align: left;
  color: white;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #ffe6d5;
    transform: scale(1.05);
  }

  img {
    width: ${(props) => (props.estado ? "30px" : "24px")};
    height: auto;
    transition: width 0.3s ease-in-out;
  }

  span {
    opacity: ${(props) => (props.estado ? "1" : "0")};
    max-height: ${(props) => (props.estado ? "100px" : "0")};
    transition: opacity 0.2s ease-in-out, max-height 0.2s ease-in-out;
    white-space: nowrap;
  }
`;
