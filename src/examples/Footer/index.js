import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import typography from "assets/theme/base/typography";

function Footer() {
  const { size } = typography;
  const name = "Our Market";
  const href = "www.ourmarket.com.ar";

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="center"
      alignItems="center"
      px={1.5}
      pt={3}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with
        <MDBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </MDBox>
        by
        <Link href={href} target="_blank">
          <MDTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </MDTypography>
        </Link>
      </MDBox>
    </MDBox>
  );
}

export default Footer;
