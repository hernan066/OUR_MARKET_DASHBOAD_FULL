/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ClientChart1 from "./chart1/ClientChar1";
import ClientChart2 from "./chart2/ClientChart2";
import { DataClient } from "./dataClient/DataClient";
import { DataOrders } from "./dataOrders/DataOrders";
import { TopProductsBuy } from "./topProductsBuy/TopProductsBuy";
import TableListOrders from "./tableOrders/TableList";
import MDTypography from "components/MDTypography";

function ResumeDataClient({
  client,
  listOrders,
  listTopProducts,
  clientBuy,
  dataClientBuyByDay,
  orders,
  totalBuyOrderByMonth,
}) {
  return (
    <>
      <Card sx={{ marginBottom: "60px" }}>
        <MDBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox>
                <DataClient client={client} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox>
                <DataOrders listOrders={listOrders} clientBuy={clientBuy} />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Card>

      <MDBox my={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ClientChart1 dataClientBuyByDay={dataClientBuyByDay} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={3}>
              <ClientChart2 reports={totalBuyOrderByMonth} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      <Card>
        <MDBox p={3}>
          <TopProductsBuy listTopProducts={listTopProducts} />
        </MDBox>
      </Card>
      <Card sx={{ margin: "40px 0" }}>
        <MDBox p={3}>
          <MDTypography variant="h5" mb={0}>
            Lista de ordenes
          </MDTypography>
          <MDTypography
            component="div"
            variant="button"
            color="text"
            fontWeight="light"
            mb={3}
          >
            Todas las ordenes del cliente
          </MDTypography>
          <TableListOrders orders={orders.data.orders} />
        </MDBox>
      </Card>
    </>
  );
}

export default ResumeDataClient;
