/* eslint-disable react/prop-types */
import { Box, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { formatPrice } from "utils/formaPrice";
import { formatQuantity } from "utils/quantityFormat";

export function DataOrders({ listOrders, clientBuy }) {
  const totalOrders = listOrders.length;
  const pendingOrders = listOrders.filter(
    (order) => order.status === "Pendiente"
  ).length;
  const paidOrders = listOrders.filter((order) => order.paid).length;
  const unpaidOrders = listOrders.filter((order) => !order.paid).length;

  const totalBuy = listOrders.reduce((acc, curr) => acc + curr.total, 0);
  const totalCash = listOrders.reduce(
    (acc, curr) => acc + curr.payment.cash,
    0
  );
  const totalTransfer = listOrders.reduce(
    (acc, curr) => acc + curr.payment.transfer,
    0
  );
  const totalDebt = listOrders.reduce(
    (acc, curr) => acc + curr.payment.debt,
    0
  );

  return (
    <Box
      sx={{
        flex: 1,
        border: "1px solid #ccc",
        borderRadius: 1,
        padding: 2,
        alignSelf: "flex-start",
      }}
    >
      <MDTypography variant="h5">Resumen de ordenes</MDTypography>
      <MDTypography
        component="div"
        variant="button"
        color="text"
        fontWeight="light"
      >
        Dato de ordenes de compra
      </MDTypography>
      <Divider />
      <MDBox
        mb={1}
        sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
      >
        <MDTypography variant="h6">Total de ordenes:</MDTypography>
        <MDBox>
          <MDTypography variant="h6">{totalOrders}</MDTypography>
        </MDBox>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">
          Ordenes <span style={{ color: "orange" }}>pendientes</span>:
        </MDTypography>
        <MDBox>
          <MDTypography variant="h6">{pendingOrders}</MDTypography>
        </MDBox>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">
          Ordenes <span style={{ color: "green" }}>pagas</span>:
        </MDTypography>
        <MDBox>
          <MDTypography variant="h6">{paidOrders}</MDTypography>
        </MDBox>
      </MDBox>
      <MDBox
        mb={1}
        sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
      >
        <MDTypography variant="h6">
          Ordenes <span style={{ color: "red" }}>impagas</span>:
        </MDTypography>
        <MDBox sx={{}}>
          <MDTypography variant="h6">{unpaidOrders}</MDTypography>
        </MDBox>
      </MDBox>

      <MDBox
        mb={1}
        sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
      >
        <MDTypography variant="h6">Monto total de compras: </MDTypography>
        <MDTypography variant="h6">
          {totalBuy ? formatPrice(totalBuy) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">
          Total de pagos en <span style={{ color: "green" }}>efectivo</span>:{" "}
        </MDTypography>
        <MDTypography variant="h6" sx={{ color: "green" }}>
          {totalCash ? formatPrice(totalCash) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">
          Total de pagos en{" "}
          <span style={{ color: "green" }}>transferencias</span>:
        </MDTypography>
        <MDTypography variant="h6" sx={{ color: "green" }}>
          {totalTransfer ? formatPrice(totalTransfer) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">
          Total de <span style={{ color: "red" }}>deudas</span>:{" "}
        </MDTypography>
        <MDTypography variant="h6" sx={{ color: "red" }}>
          {totalDebt ? formatPrice(totalDebt) : "$0"}
        </MDTypography>
      </MDBox>

      <MDBox
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          marginTop: "12px",
        }}
      >
        <MDTypography variant="h6">Promedio de compra: </MDTypography>
        <MDTypography variant="h6" sx={{ color: "black" }}>
          {clientBuy?.totalBuy ? formatPrice(totalBuy / totalOrders) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          marginTop: "12px",
        }}
      >
        <MDTypography variant="h6">Compras: </MDTypography>
        <MDTypography variant="h6" sx={{ color: "black" }}>
          {clientBuy?.totalBuy ? formatPrice(clientBuy?.totalBuy) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Costo: </MDTypography>
        <MDTypography variant="h6" sx={{ color: "red" }}>
          {clientBuy?.totalBuy ? formatPrice(clientBuy?.totalCost) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Ganancia en $: </MDTypography>
        <MDTypography variant="h6" sx={{ color: "green" }}>
          {clientBuy?.totalBuy ? formatPrice(clientBuy?.totalProfits) : "$0"}
        </MDTypography>
      </MDBox>
      <MDBox sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <MDTypography variant="h6">Ganancia en %: </MDTypography>
        <MDTypography variant="h6" sx={{ color: "black" }}>
          {clientBuy?.totalProfits
            ? formatQuantity(
                (clientBuy.totalProfits * 100) / clientBuy.totalCost
              )
            : "0"}
          %
        </MDTypography>
      </MDBox>
    </Box>
  );
}
