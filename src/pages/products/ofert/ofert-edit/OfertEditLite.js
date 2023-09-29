/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";

import Swal from "sweetalert2";
import { creteOfertSchema } from "validations/oferts/creteOfertYup";
import { usePutOfertMutation } from "api/ofertApi";

function OfertEditLite({ ofertById }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { ofert } = ofertById.data;

  const [editOfert, { isLoading, isError }] = usePutOfertMutation();

  const formik = useFormik({
    initialValues: {
      product: ofert.product.name,
      description: ofert.description,
      basePrice: ofert.basePrice,
      visible: ofert.visible,
    },
    onSubmit: async (values) => {
      const editOfertValues = {
        description: values.description,
        visible: values.visible,
        basePrice: values.basePrice,
      };

      await editOfert({ id, ...editOfertValues }).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Oferta editada con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
    },
    validationSchema: creteOfertSchema,
  });

  return (
    <MDBox pt={6} pb={3}>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
        }}
      >
        <Box sx={{ mt: 1, mx: 2, display: "flex", width: "100%", gap: 3 }}>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ width: "100%" }}
          >
            <p>{ofert.product.name}</p>
            <TextField
              margin="normal"
              fullWidth
              name="product"
              label="Nombre del producto"
              value={ofert.product.name}
              error={!!formik.errors.product}
              helperText={formik.errors.product}
              onChange={formik.handleChange}
              disabled="true"
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="description"
              label="Presentación"
              id="product_description"
              value={formik.values.description}
              error={!!formik.errors.description}
              helperText={formik.errors.description}
              onChange={formik.handleChange}
            />

            <TextField
              type="number"
              margin="normal"
              fullWidth
              required
              name="basePrice"
              label="Precio"
              value={formik.values.basePrice}
              error={!!formik.errors.basePrice}
              helperText={formik.errors.basePrice}
              onChange={formik.handleChange}
            />

            <TextField
              id="product_available_ofert"
              margin="normal"
              required
              select
              name="visible"
              fullWidth
              label="Visible en web"
              value={formik.values.visible}
              error={!!formik.errors.visible}
              helperText={formik.errors.visible}
              onChange={formik.handleChange}
            >
              <MenuItem key="product_visible_true" value={true}>
                Si
              </MenuItem>
              <MenuItem key="product_visible_false" value={false}>
                No
              </MenuItem>
            </TextField>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                mr: 2,
                backgroundColor: `${colors.info.main}`,
                color: "white !important",
              }}
            >
              Editar
            </LoadingButton>
            <MDButton
              variant="outlined"
              color="info"
              onClick={() => navigate(-1)}
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Cancelar
            </MDButton>
            {isError && <Alert severity="error">Ha ocurrido un error, producto no creado</Alert>}
          </Box>

          <div className="box-wrapper">
            {ofert.product.img ? (
              <img src={ofert.product.img} alt="pollo" />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                alt="pollo"
              />
            )}
            <div className="box-content">
              <div className="buy">
                <span>
                  <i className="fa fa-cart-plus" />
                </span>
              </div>
              <div className="title">{ofert.product.name}</div>
              <div className="desc">{formik.values.description}</div>
              <span className="price">${formik.values.basePrice}</span>
            </div>
          </div>
        </Box>
      </Box>
    </MDBox>
  );
}

export default OfertEditLite;
