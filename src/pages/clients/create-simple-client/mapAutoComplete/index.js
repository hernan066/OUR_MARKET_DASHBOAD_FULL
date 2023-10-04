/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import Leaflet from "./leaflet";

const MapAutoComplete = () => {
  return (
    <Box mt={2} sx={{ width: "100%", height: 610 }}>
      <Leaflet />
    </Box>
  );
};

export default MapAutoComplete;
