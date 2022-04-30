import styled, { css } from "styled-components";

export const DialogContainer = styled.div`
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

export const ButtonWrapper = styled.div`
  filter: drop-shadow(5px 5px 3px rgba(50, 50, 0, 0.5));
`;

export const buttonBaseAnimation = css`
  width: 30px;
  height: 30px;
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

export const PauseButton = styled.button`
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

export const PlayButton = styled.button`
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

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
