import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useGetClientsQuery } from "api/clientsApi";
import Loading from "components/DRLoading";
import { Alert } from "@mui/material";
import SimpleClientCreate from "./ClientSimpleCreate";
import { useGetClientTypesQuery } from "api/clientsTypeApi";
import { useGetClientCategoriesQuery } from "api/clientsCategoryApi";
import { useGetDeliveryZonesQuery } from "api/deliveryZoneApi";
import { useLoadScript } from "@react-google-maps/api";

function CreateSimpleClient() {
  const { data: clients, isLoading: l1, isError: e1 } = useGetClientsQuery();
  const { data: types, isLoading: l2, isError: e2 } = useGetClientTypesQuery();
  const {
    data: categories,
    isLoading: l3,
    isError: e3,
  } = useGetClientCategoriesQuery();
  const {
    data: zones,
    isLoading: l4,
    isError: e4,
  } = useGetDeliveryZonesQuery();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_MAP_API_KEY,
    libraries: ["places"],
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Nuevo cliente
                </MDTypography>
              </MDBox>
              <MDBox>
                {(l1 || l2 || l3 || l4 || !isLoaded) && <Loading />}
                {(e1 || e2 || e3 || e4) && (
                  <Alert severity="error">Ha ocurrido un error</Alert>
                )}
                {clients && categories && types && zones && (
                  <SimpleClientCreate
                    clients={clients.data.clients}
                    categories={categories.data.clientCategories}
                    types={types.data.clientTypes}
                    zones={zones.data.deliveryZones}
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateSimpleClient;
