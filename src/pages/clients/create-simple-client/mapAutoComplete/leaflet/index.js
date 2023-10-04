/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { DraggableMarker } from "./DraggableMarker";
import { RecenterAutomatically } from "./RecenterAutomatically";
import MDTypography from "components/MDTypography";
import colors from "assets/theme/base/colors";
import { useSelector } from "react-redux";
import { AutoCompleteForm } from "./AutoCompleteForm";

function Leaflet() {
  const { lat, lng } = useSelector((store) => store.mapAutocomplete);
  const [position, setPosition] = useState({ lat, lng });
  useEffect(() => {
    setPosition({ lat, lng });
  }, [lat, lng]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={position}
        zoom={17}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <AutoCompleteForm />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker position={position} setPosition={setPosition} />
        <RecenterAutomatically lat={position.lat} lng={position.lng} />
      </MapContainer>
      <Box
        sx={{
          backgroundColor: colors.gradients.grey_blue.main,
          padding: "10px",
        }}
      >
        <MDTypography
          sx={{ textAlign: "center", color: "#fff" }}
          variant="h5"
        >{`Lat: ${position.lat} || Lon: ${position.lng}`}</MDTypography>
      </Box>
    </div>
  );
}

export default Leaflet;
