import { Box, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress color="info" />
    </Box>
  );
}

export default Loading;
