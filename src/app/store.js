import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import jokeReducer from "../features/joke/joke.slice";

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

export const store = configureStore({
  reducer: {
    joke: jokeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleWares),
  devTools: process.env.NODE_ENV !== "production",
});
