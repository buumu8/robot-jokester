import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectJokes,
  fetchJokesAsync,
  selectStatus,
  selectTyping,
} from "./joke.slice";

import Typer from "../typer/typer.component";
import Spinner from "../../components/spinner/spinner.component";

import {
  DialogContainer,
  ButtonContainer,
  ButtonWrapper,
  PlayButton,
} from "./joke.styles";

const Joke = () => {
  const jokes = useSelector(selectJokes);
  const status = useSelector(selectStatus);
  const typing = useSelector(selectTyping);

  const dispatch = useDispatch();

  return (
    <DialogContainer>
      {status === "loading" ? <Spinner /> : <Typer dataText={jokes} />}
      {status === "idle" && !typing && (
        <ButtonContainer>
          <ButtonWrapper>
            <PlayButton onClick={() => dispatch(fetchJokesAsync())} />
          </ButtonWrapper>
        </ButtonContainer>
      )}
    </DialogContainer>
  );
};

export default Joke;
