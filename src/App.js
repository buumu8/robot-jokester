import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Joke from "./features/joke/joke.component";

import robotImage from "./assets/robot.gif";

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    width: 100%;
    background-color: ${(props) => props.theme.colors.background.primary};
    background-image: url(${robotImage});
    background-position: center bottom;
    background-repeat: no-repeat;
  }

  @media screen and (max-width: 375px) {
    body{
      background-size: contain;
    }
  }

`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.brand.primary};
  color: white;
  text-align: center;
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Joke />
      <Footer>
        All right reserved &copy;{new Date().getFullYear()} Jettapol Tuetrakul
      </Footer>
    </div>
  );
}

export default App;
