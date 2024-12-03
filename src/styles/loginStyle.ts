import styled from "styled-components";

export const Container = styled.div`
  background-image: url('/login_bg.png'); /* Altere para o caminho correto da imagem */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Arial', sans-serif;
`;

export const LoginLogo = styled.img`
  width: 350px;
  height: auto;
  margin-bottom: 20px;
`;

export const BorderContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
`;

export const LoginIpunt = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const LoginButton = styled.button`
  background-color: #ff6200;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8c32;
  }
`;
