/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { useDispatch, useSelector } from "react-redux";
import { setLat, setLng } from "reduxToolkit/mapAutocomplete";

export const AutoCompleteForm = () => {
  const dispatch = useDispatch();
  const { address, city, province, zip } = useSelector(
    (store) => store.mapAutocomplete
  );

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
      types: ["address"],
      componentRestrictions: { country: "AR" },
    },
    debounce: 500,
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });

    const { lat, lng } = await getLatLng(results[0]);
    dispatch(setLat(lat));
    dispatch(setLng(lng));
  };

  useEffect(() => {
    setValue(`${address} ${province} ${city} ${zip}`);
  }, [address, province, city, zip]);

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 999,
          margin: "0 20px 0 55px",
        }}
      >
        <TextField
          margin="normal"
          fullWidth
          name="auto"
          label="Selecciona la opción correcta para cargar las coordenadas"
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          value={value}
          sx={{ backgroundColor: "#fff" }}
        />
        <Box
          sx={{
            backgroundColor: "#fff",
            position: "absolute",
            top: "60px",
            zIndex: 999,
            right: 0,
            left: 0,
            border: `${status === "OK" ? "1px solid #666" : "none"}`,
            borderRadius: "10px",
          }}
        >
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ListItem component="div" disablePadding key={place_id}>
                <ListItemButton>
                  <ListItemText
                    primary={description}
                    onClick={() => handleSelect(description)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
