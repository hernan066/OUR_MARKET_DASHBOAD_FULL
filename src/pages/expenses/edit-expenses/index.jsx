import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Alert, Box } from "@mui/material";
import ExpensesEdit from "./ExpensesEdit";
import { useParams } from "react-router-dom";
import { useGetExpensesQuery } from "api/expensesApi";
import Loading from "components/DRLoading";

function EditExpenses() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetExpensesQuery(id);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box pt={6} pb={3}>
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
                  Nuevo Gasto
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDBox>
                  {isLoading && <Loading />}
                  {isError && (
                    <Alert severity="error">Ha ocurrido un error</Alert>
                  )}
                  {data && <ExpensesEdit expenses={data.data.expenses} />}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default EditExpenses;
