import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAddress,
  setCity,
  setProvince,
  setZip,
} from "reduxToolkit/mapAutocomplete";

export const useSetAddressData = (address, city, province, zip) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (address) {
      dispatch(setAddress(address));
    }
    if (city) {
      dispatch(setCity(city));
    }
    if (province) {
      dispatch(setProvince(province));
    }
    if (zip) {
      dispatch(setZip(zip));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, city, province, zip]);
};
