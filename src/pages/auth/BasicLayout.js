import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/authentication/components/Footer";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";

// eslint-disable-next-line no-unused-vars
function BasicLayout({ children }) {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <PageLayout>
      <MDBox width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          {matches && (
            <Grid item xs={0} sm={0} md={5} lg={4} xl={8}>
              <Box
                sx={{
                  backgroundColor: "#464b55",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "700px" }}>
                  <img
                    src="https://ik.imagekit.io/mrprwema7/OurMarket/our-market-low-resolution-logo-color-on-transparent-background_tryvGRTNa.png?updatedAt=1695680889949"
                    alt="logo"
                    style={{ width: "100%" }}
                  />
                </Box>
              </Box>
            </Grid>
          )}

          <Grid
            item
            xs={12}
            sm={9}
            md={5}
            lg={4}
            xl={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: `${matches ? "#e1e1e1" : "#ee1702"}`,
            }}
          >
            <Box
              sx={{
                width: `${matches ? "400px" : "100%"}`,
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {children}
            </Box>
          </Grid>
        </Grid>
      </MDBox>
      <Footer light />
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
