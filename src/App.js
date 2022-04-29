import React from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import robotImage from "./assets/robot.gif";

import Typer from "./features/typer/typer.component";

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    width: 100%;
    background-color: ${(props) => props.theme.colors.background.primary};
    background-image: url(${robotImage});
    background-position: center bottom;
    background-repeat: no-repeat;
  }

  @media screen and (max-width: 400px) {
    body{
      background-size: contain;
    }
  }
`;

const DialogContainer = styled.div`
  background-color: white;
  position: relative;
  height: max(auto, 50vh);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  padding: 1rem;
  margin: 1rem;
  border-radius: 1rem;

  &:after {
    content: "";
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: #fff;
    position: absolute;
    bottom: -1rem;
    left: calc(50% - 0.5rem);
    clip-path: polygon(0 0, 100% 0, 50% 100%);
  }
`;

const ButtonWrapper = styled.div`
  filter: drop-shadow(5px 5px 3px rgba(50, 50, 0, 0.5));
`;

const buttonBaseAnimation = css`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: none;
  background-color: orange;

  &:hover {
    filter: opacity(50%);
  }

  &:active {
    transform: translateY(0.5rem);
  }
`;

const PauseButton = styled.button`
  clip-path: polygon(
    100% 0,
    100% 100%,
    66% 100%,
    66% 0,
    35% 0,
    35% 100%,
    0 100%,
    0 0
  );

  ${buttonBaseAnimation}
`;

const PlayButton = styled.button`
  clip-path: polygon(
    100% 49%,
    100% 49%,
    46% 77%,
    46% 26%,
    46% 25%,
    46% 77%,
    0 100%,
    0 0
  );

  ${buttonBaseAnimation}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <DialogContainer>
        <Typer
          dataText={[
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eius
          aliquid quidem accusantium ipsum nisi nulla eos repellendus sint est
          dignissimos ut id perspiciatis corporis ex et excepturi ratione atque.`,
          ]}
        />

        <ButtonContainer>
          <ButtonWrapper>
            <PauseButton />
          </ButtonWrapper>
          <audio controls></audio>
          <ButtonWrapper>
            <PlayButton />
          </ButtonWrapper>
        </ButtonContainer>
      </DialogContainer>
    </div>
  );
}

export default App;
