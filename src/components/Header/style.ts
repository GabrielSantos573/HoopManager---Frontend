import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  background-color: #ff6200;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    color: white;
  }

  p {
    font-size: 16px;
    margin: 5px 0 0;
    color: #ffe6d5;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    height: auto;
    width: auto;
  }
`;

export const LogoutContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
