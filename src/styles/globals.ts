import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background-color: #fff5e6; /* Fundo suave */
  color: #333; /* Texto padrão */
  height: 100vh;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: #ff6200; /* Links na cor laranja */
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ff8c32;
  }
}

button {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
}

* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    background-color: #333; /* Fundo escuro */
    color: #fff; /* Texto claro */
  }
}

/* Estilo do Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #ffe6d5; /* Fundo do scrollbar */
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #ff6200; /* Cor do indicador */
  border-radius: 5px;

  &:hover {
    background: #ff8c32;
  }
}
`;
