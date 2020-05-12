import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "toDos",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

const store = configureStore({ reducer: slice.reducer });

export const { add, remove } = slice.actions;

export default store;
