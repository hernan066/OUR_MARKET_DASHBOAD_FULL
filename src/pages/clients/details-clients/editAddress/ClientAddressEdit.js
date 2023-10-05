/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { createClientAddressSchema } from "validations/clientAddress/createClientAddressSchemaYup";
import Swal from "sweetalert2";
import { usePutClientAddressMutation } from "api/clientsAddressApi";
import { provinces } from "data/province";
import MapAutoComplete from "./mapAutoComplete";
import { useEffect } from "react";
import { clearAddress, setLat, setLng } from "reduxToolkit/mapAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import { useSetAddressData } from "hooks/useSetAddressData";

function ClientAddressEdit({ client, zones, clientAddress }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lat, lng } = useSelector((store) => store.mapAutocomplete);

  const [createClientAddress, { isLoading, isError }] =
    usePutClientAddressMutation();

  const formik = useFormik({
    initialValues: {
      user: "",
      address: clientAddress.address,
      department: clientAddress.department,
      flor: clientAddress.flor,
      province: clientAddress.province,
      city: clientAddress.city,
      zip: clientAddress.zip,
      deliveryZone: clientAddress.deliveryZone,
      type: clientAddress.type,
      lat,
      lng,
    },
    onSubmit: async (values) => {
      const editClientAddress = {
        ...values,
        user: client.user._id,
        client: client._id,
        lat,
        lng,
      };

      const res = await createClientAddress({
        id: clientAddress._id,
        ...editClientAddress,
      }).unwrap();
      console.log(editClientAddress);
      console.log(res);
      if (res.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cliente editado con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    },
    validationSchema: createClientAddressSchema,
  });

  console.log(lat, lng);

  useEffect(() => {
    dispatch(clearAddress());
    dispatch(setLat(clientAddress.lat || 0));
    dispatch(setLng(clientAddress.lng || 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useSetAddressData(
    formik.values.address,
    formik.values.city,
    formik.values.province,
    formik.values.zip
  );

  return (
    <MDBox pt={3} pb={3}>
      <Box
        sx={{
          display: "flex",
          gap: 5,
        }}
      >
        <Box
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1, mx: 2, display: "flex", gap: 3, width: "100%" }}
        >
          <Box mt={3} sx={{ width: "50%" }}>
            <TextField
              margin="normal"
              fullWidth
              required
              name="address"
              label="Dirección"
              value={formik.values.address}
              error={!!formik.errors.address}
              helperText={formik.errors.address}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="department"
              label="Departamento (opcional)"
              value={formik.values.department}
              error={!!formik.errors.department}
              helperText={formik.errors.department}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="flor"
              label="Piso (opcional)"
              value={formik.values.flor}
              error={!!formik.errors.flor}
              helperText={formik.errors.flor}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              select
              fullWidth
              name="province"
              label="Provincia"
              value={formik.values.province}
              error={!!formik.errors.province}
              helperText={formik.errors.province}
              onChange={formik.handleChange}
            >
              {provinces.map((province) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              required
              name="city"
              label="Ciudad"
              value={formik.values.city}
              error={!!formik.errors.city}
              helperText={formik.errors.city}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              type="number"
              name="zip"
              label="Código postal"
              value={formik.values.zip}
              error={!!formik.errors.zip}
              helperText={formik.errors.zip}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              select
              name="deliveryZone"
              fullWidth
              label="Zona"
              value={formik.values.deliveryZone}
              error={!!formik.errors.deliveryZone}
              helperText={formik.errors.deliveryZone}
              onChange={formik.handleChange}
            >
              {zones.map((zone) => (
                <MenuItem key={zone._id} value={zone._id}>
                  {zone.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              margin="normal"
              required
              select
              name="type"
              fullWidth
              label="Tipo de dirección"
              value={formik.values.type}
              error={!!formik.errors.type}
              helperText={formik.errors.type}
              onChange={formik.handleChange}
            >
              <MenuItem value="negocio">Negocio</MenuItem>
              <MenuItem value="casa">Casa</MenuItem>
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              required
              type="number"
              name="lat"
              label="Latitud"
              value={lat}
              error={!!formik.errors.lat}
              helperText={formik.errors.lat}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              type="number"
              name="lng"
              label="Longitud"
              value={lng}
              error={!!formik.errors.lng}
              helperText={formik.errors.lng}
              onChange={formik.handleChange}
            />

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
            {isError && (
              <Alert severity="error">Error — Dirección no actualizada</Alert>
            )}
          </Box>

          <Box mt={3} sx={{ width: "50%" }}>
            <MapAutoComplete />
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default ClientAddressEdit;
