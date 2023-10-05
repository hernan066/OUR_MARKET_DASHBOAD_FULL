/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Loading from "components/DRLoading";
import { Alert, Box, Tab, Tabs } from "@mui/material";
import { useGetClientQuery } from "api/clientsApi";
import { useParams } from "react-router-dom";
import { useGetClientOrderQuery } from "api/orderApi";
import {
  useGetReportTotalClientBuyIndividualQuery,
  useGetReportTotalClientBuyIndividualByDayQuery,
  useGetTotalOrdersByMonthQuery,
} from "api/reportApi";
import { useGetAllRecommendationByClientQuery } from "api/recommnedationApi";
import ResumeDataClient from "./ResumeDataClient";
import RedeemPoints from "./redeemPoints/RedeemPoints";
import EditClient from "./editClient";
import EditClientAddress from "./editAddress";
import HistoryPoints from "./historyPoints";
import { useLoadScript } from "@react-google-maps/api";
import { getListProducts, repeatSum } from "utils/getListProductsToOrders";

function DetailsClients() {
  const { id } = useParams();

  const [page, setPage] = useState(0);

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  const { data: dataClient, isLoading: l1, error: e1 } = useGetClientQuery(id);
  const {
    data: dataOrders,
    isLoading: l2,
    error: e2,
  } = useGetClientOrderQuery(id);
  const {
    data: dataClientBuy,
    isLoading: l3,
    error: e3,
  } = useGetReportTotalClientBuyIndividualQuery(id);

  const {
    data: dataClientBuyByDay,
    isLoading: l4,
    error: e4,
  } = useGetReportTotalClientBuyIndividualByDayQuery(id);

  const {
    data: recommendationData,
    isLoading: l5,
    error: e5,
  } = useGetAllRecommendationByClientQuery(id);
  const {
    data: totalBuyOrderByMonth,
    isLoading: l6,
    error: e6,
  } = useGetTotalOrdersByMonthQuery(id);

  const [listProducts, setListProducts] = useState(null);
  const [listTopProducts, setListTopProducts] = useState(null);

  useEffect(() => {
    if (dataOrders) {
      setListProducts(getListProducts(dataOrders.data.orders));
    }
  }, [dataOrders]);

  useEffect(() => {
    if (listProducts) {
      setListTopProducts(repeatSum(listProducts));
    }
  }, [listProducts]);

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
                Cliente {dataClient?.data?.client?.user.name || ""}{" "}
                {dataClient?.data?.client?.user.lastName || ""}
              </MDTypography>
            </MDBox>

            <Box
              sx={{
                display: "flex",
                gap: "20px",
                width: "100%",
                flexDirection: "column",
                px: 2,
                my: 2,
              }}
            >
              <Tabs value={page} onChange={handleChange} centered>
                <Tab label="Datos del cliente" />
                <Tab label="Editar cliente" />
                <Tab label="Editar dirección" />
                {/*   <Tab label="Canjear puntos" />
                <Tab label="Historial de puntos" /> */}
              </Tabs>
            </Box>
            {page === 0 && (
              <Box
                sx={{
                  mx: 2.5,
                }}
              >
                {(l1 || l2 || l3 || l4 || l5 || l6 || !isLoaded) && <Loading />}
                {(e1 || e2 || e3 || e4 || e5 || e6) && (
                  <Alert severity="error">ha ocurrido un error</Alert>
                )}
                {dataClient &&
                  dataOrders &&
                  listTopProducts &&
                  dataClientBuy &&
                  dataClientBuyByDay &&
                  totalBuyOrderByMonth &&
                  recommendationData && (
                    <Box>
                      <ResumeDataClient
                        client={dataClient.data.client}
                        listOrders={dataOrders.data.orders}
                        listTopProducts={listTopProducts}
                        clientBuy={dataClientBuy.data?.report[0]}
                        dataClientBuyByDay={dataClientBuyByDay.data.report}
                        totalBuyOrderByMonth={totalBuyOrderByMonth.data.report}
                        recommendation={recommendationData.data.recommendation}
                        orders={dataOrders}
                      />
                    </Box>
                  )}
              </Box>
            )}
            {page === 1 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                <EditClient />
              </Card>
            )}
            {page === 2 && (
              <Box
                sx={{
                  mx: 2.5,
                }}
              >
                <EditClientAddress client={dataClient.data.client} />
              </Box>
            )}
            {page === 3 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                <RedeemPoints />
              </Card>
            )}
            {page === 4 && (
              <Card
                sx={{
                  mx: 2.5,
                }}
              >
                <HistoryPoints />
              </Card>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailsClients;
