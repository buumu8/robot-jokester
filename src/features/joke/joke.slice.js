import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

const initialState = {
  jokes: ["Hi there! I'm Robot Jokester. Press play button to start."],
  status: "idle",
  error: null,
  typing: false,
};

export const fetchVoiceAsync = createAsyncThunk(
  "voice/fetchVoice",
  async (joke, { rejectWithValue, fulfillWithValue }) => {
    const apiUrl = `/.netlify/functions/token-hider?${joke}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      new Audio(`data:audio/mpeg;base64,${data}`).play();
      console.log(data);
      return fulfillWithValue();
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const fetchJokesAsync = createAsyncThunk(
  "joke/fetchJoke",
  async (params, { getState, dispatch, rejectWithValue }) => {
    let newjoke = "";
    const jokes = getState().joke.jokes;

    const apiUrl =
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.setup) {
        newjoke = `${data.setup} ... ${data.delivery}`;
      } else {
        newjoke = data.joke;
      }
      //   newjoke.replace(/\n/g, "<br />");
      dispatch(isTyping());
      dispatch(fetchVoiceAsync(newjoke));
      return [...jokes, newjoke];
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const jokeSlice = createSlice({
  name: "joke",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    isTypingFinished(state) {
      state.typing = false;
    },
    isTyping(state) {
      state.typing = true;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJokesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.jokes = action.payload;
      })
      .addCase(fetchJokesAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(fetchVoiceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVoiceAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(fetchVoiceAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.joke.value)`
export const selectJoke = (state) => state.joke;
export const selectJokes = createSelector(
  [selectJoke],
  (jokeSlice) => jokeSlice.jokes
);
export const selectStatus = createSelector(
  [selectJoke],
  (jokeSlice) => jokeSlice.status
);
export const selectError = createSelector(
  [selectJoke],
  (jokeSlice) => jokeSlice.error
);
export const selectTyping = createSelector(
  [selectJoke],
  (jokeSlice) => jokeSlice.typing
);

export const { isTypingFinished, isTyping } = jokeSlice.actions;

export default jokeSlice.reducer;
