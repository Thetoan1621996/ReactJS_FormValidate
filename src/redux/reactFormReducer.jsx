import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrSV: [],
  user: {},
};

const reactFormReducer = createSlice({
  name: "reactFormReducer",
  initialState,
  reducers: {
    addNewSV: (state, action) => {
      let newSV = action.payload;
      state.arrSV.push(newSV);
    },
    addUserFromLocalStorage: (state, action) => {
      state.arrSV = action.payload;
    },
    delSV: (state, action) => {
      let idSV = action.payload;
      state.arrSV = state.arrSV.filter((user) => {
        return user.id !== idSV;
      });
    },
    editSV: (state, action) => {
      state.user = action.payload;
    },
    searchSV: (state, action) => {
      let keyword = action.payload;
      let searchSV = state.arrSV.filter((sv) => {
        return sv.name.trim().toLowerCase().includes(keyword);
      });
      
      console.log("haha", searchSV);
      state.arrSV = searchSV;
    },
    updateSV: (state, action) => {
      let svUpdate = state.arrSV.findIndex((sv) => sv.id === action.payload.id);
      state.arrSV[svUpdate] = { ...action.payload };
    },
  },
});

export const {
  addNewSV,
  delSV,
  addUserFromLocalStorage,
  editSV,
  updateSV,
  searchSV,
} = reactFormReducer.actions;

export default reactFormReducer.reducer;
