// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Kanit', sans-serif;
  }
`;

export default GlobalStyles;
