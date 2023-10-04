/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const mapAutocompleteSlice = createSlice({
  name: "mapAutocomplete",
  initialState: {
    address: "",
    province: "",
    city: "",
    zip: "",
    lat: -34.56738150137404,
    lng: -58.74163704277706,
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
      state.lat = -34.56738150137404;
      state.lng = -58.74163704277706;
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
