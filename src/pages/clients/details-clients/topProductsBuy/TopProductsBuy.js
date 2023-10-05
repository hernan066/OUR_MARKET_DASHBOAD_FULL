/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Avatar, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Link, createSearchParams, useParams } from "react-router-dom";
import { formatPrice } from "utils/formaPrice";
import { formatQuantity } from "utils/quantityFormat";

export function TopProductsBuy({ listTopProducts }) {
  console.log(listTopProducts);

  return (
    <MDBox
      sx={{ flex: 1, border: "1px solid #ccc", borderRadius: 1, padding: 2 }}
    >
      <MDTypography variant="h5">Top productos comprados</MDTypography>
      <MDTypography
        component="div"
        variant="button"
        color="text"
        fontWeight="light"
      >
        Agrupados por productos
      </MDTypography>
      <Divider />
      <MDBox
        mb={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MDBox
          sx={{ display: "flex", gap: 3, alignItems: "center", width: "35%" }}
        >
          <MDTypography variant="h6" ml={2} sx={{ letterSpacing: "2px" }}>
            PRODUCTO
          </MDTypography>
        </MDBox>

        <MDTypography
          variant="h6"
          sx={{
            width: "33%",
            textAlign: "center",

            letterSpacing: "2px",
          }}
        >
          ID
        </MDTypography>
        <MDTypography
          variant="h6"
          sx={{
            width: "15%",
            textAlign: "center",

            letterSpacing: "2px",
          }}
        >
          CANTIDAD
        </MDTypography>
        <MDTypography
          variant="h6"
          sx={{
            width: "15%",
            textAlign: "right",

            letterSpacing: "2px",
          }}
        >
          TOTAL
        </MDTypography>
      </MDBox>

      {listTopProducts.map((product) => (
        <Product product={product} key={product.productId} />
      ))}
    </MDBox>
  );
}

const Product = ({ product }) => {
  const { id } = useParams();
  return (
    <Link
      to={{
        pathname: `/clientes/detalle/producto/${product.productId}`,
        search: `?${createSearchParams({
          cliente: `${id}`,
        })}`,
      }}
    >
      <MDBox
        mb={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#dddddd2d",
          },
        }}
      >
        <MDBox
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            width: "35%",
          }}
        >
          <Avatar src={product.img} />
          <MDTypography variant="body2">{product.name}</MDTypography>
        </MDBox>

        <MDTypography
          variant="body2"
          sx={{ width: "35%", textAlign: "center" }}
        >
          {product.productId}
        </MDTypography>
        <MDTypography variant="h6" sx={{ width: "15%", textAlign: "center" }}>
          {formatQuantity(product.totalQuantity)}
        </MDTypography>
        <MDTypography
          variant="h6"
          mr={1}
          sx={{ width: "15%", textAlign: "right" }}
        >
          {formatPrice(product.totalPrice)}
        </MDTypography>
      </MDBox>
    </Link>
  );
};
