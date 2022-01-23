import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { App } from "./App";

const theme = {
  colors: {
    background: "rgb(35, 39, 47)",
    font: "#ffffff",
    button: "rgb(8, 126, 164)",
    form: "rgb(52, 58, 70)",
    hover: "rgba(8, 126, 164, 0.8)",
    warning: "#ff0000",
  },
};

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
  }

  h1,p,ul,li{
    margin: 0;
    padding: 0;
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
}
`;

ReactDOM.render(
  <>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </>,
  document.getElementById("root")
);
