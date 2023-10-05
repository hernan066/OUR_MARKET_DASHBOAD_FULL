/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Box, Card, Divider } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStock, addOrder } from "reduxToolkit/ordersSlice";

import { formatPrice } from "utils/formaPrice";
import EditAddressForm from "./EditAddressForm";
import ItemCard from "./ItemCard";

function Details({ order, deliveryZones, deliveryTrucks }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addOrder(order));
  }, []);

  useEffect(() => {
    const originalStock = order.orderItems.map((product) => ({
      name: product.name,
      productId: product.productId,
      stockId: product.stockId,
      totalQuantity: product.totalQuantity,
      newQuantity: product.totalQuantity,
    }));
    dispatch(addStock(originalStock));
  }, []);

  const orderStore = useSelector((store) => store.order.order);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "75%",
          alignSelf: "flex-start",
        }}
      >
        {orderStore?.orderItems.map((product) => (
          <ItemCard product={product} key={product._id} />
        ))}
      </Box>
      <Card
        sx={{
          padding: "25px",
          width: "25%",
        }}
      >
        <MDTypography variant="h6">Resumen</MDTypography>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Subtotal</MDTypography>
          <MDTypography variant="h6">
            {formatPrice(orderStore?.subTotal)}
          </MDTypography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <MDTypography variant="body2">Envío</MDTypography>
          <MDTypography variant="h6">
            {formatPrice(orderStore?.tax)}
          </MDTypography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mb={3}>
          <MDTypography variant="body2">Total</MDTypography>
          <MDTypography variant="h6">
            {formatPrice(orderStore?.total)}
          </MDTypography>
        </Box>

        <MDTypography variant="h6">Datos del cliente</MDTypography>
        <EditAddressForm
          zones={deliveryZones}
          deliveryTrucks={deliveryTrucks}
          order={order}
        />
      </Card>
    </Box>
  );
}

export default Details;
