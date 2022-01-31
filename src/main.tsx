import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { App } from "./App";
import { LiffProvider } from "./hook/useLiff";
import { ThemeProvider } from "./hook/useTheme";

export const GlobalStyle = createGlobalStyle`
  html,body {
    font-size: 0.625em;
    font-weight: 400;
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    text-align: justify;
    box-sizing: border-box;
    letter-spacing: 1px;
    overflow-x:hidden;
    line-height: 1;
  }

  h1,h2,p,ul,li{
    margin: 0;
    padding: 0;
  }

  h1{
    font-size:25px 
  }

  h2{
    font-size:17px; 
  }

ul {
  list-style: none;
}

  a{
    text-decoration: none;
    color: #111111;
  }

  input{
          border: none;
          outline: none;
  }

  button {
    font: inherit;
          cursor: pointer;
          border: none;
          outline: none;
          appearance: none;
  }

textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    resize: none;
    border: 0;
    outline: none;
}

* {
  box-sizing: border-box;
  line-height: 1;
}
`;

ReactDOM.render(
  <>
    <React.StrictMode>
      <GlobalStyle />
      <ThemeProvider>
        <LiffProvider>
          <App />
        </LiffProvider>
      </ThemeProvider>
    </React.StrictMode>
  </>,
  document.getElementById("root")
);
