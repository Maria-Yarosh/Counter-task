import {
  createSlice,
  configureStore,
  type PayloadAction,
} from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    maxValue: 0,
    startValue: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    reset: (state) => {
      state.value = state.startValue;
    },
    applySettings: (
      state,
      action: PayloadAction<{ maxValue: number; startValue: number }>,
    ) => {
      state.maxValue = action.payload.maxValue;
      state.startValue = action.payload.startValue;
      state.value = action.payload.startValue;
    },
  },
});

export const { incremented, reset, applySettings } = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
