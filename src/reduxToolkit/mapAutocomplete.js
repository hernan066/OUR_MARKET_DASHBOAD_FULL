/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const mapAutocompleteSlice = createSlice({
  name: "mapAutocomplete",
  initialState: {
    address: "",
    province: "",
    city: "",
    zip: "",
    lat: 0,
    lng: 0,
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setProvince: (state, action) => {
      state.province = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setZip: (state, action) => {
      state.zip = action.payload;
    },
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setLng: (state, action) => {
      state.lng = action.payload;
    },

    clearAddress: (state) => {
      state.address = "";
      state.province = "";
      state.city = "";
      state.zip = "";
      state.lat = 0;
      state.lng = 0;
    },
  },
});

export const {
  setAddress,
  setProvince,
  setCity,
  setZip,
  clearAddress,
  setLat,
  setLng,
} = mapAutocompleteSlice.actions;
export default mapAutocompleteSlice.reducer;
