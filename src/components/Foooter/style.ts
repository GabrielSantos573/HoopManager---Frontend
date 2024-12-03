import styled from "styled-components";

export const Container = styled.footer`
  background-color: #ff6200; /* Laranja da identidade visual */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  margin-top: auto;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 12px; /* Texto menor para telas menores */
    height: 50px;
  }
`;
