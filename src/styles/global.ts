import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing:border-box;

 
    }
    html{
    font-family: 'Fira Sans', sans-serif;
    font-size: 62.5%;
    scroll-behavior: smooth;
    max-width: 100%;
     -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    }
    ::placeholder {
        color: #989898;
        /* padding-left: 60px; */
      
    }
 `;

export default GlobalStyle;
