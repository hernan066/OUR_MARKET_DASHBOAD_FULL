/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import { usePostClientSimpleMutation } from "api/clientsApi";
import Swal from "sweetalert2";
import {
  createSimpleClientAddressSchema,
  createSimpleClientSchema,
} from "validations/client/createSimpleClientYup";
import { useState } from "react";
import { provinces } from "data/province";
import { clearAddress } from "reduxToolkit/mapAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import MapAutoComplete from "./mapAutoComplete";
import { useSetAddressData } from "hooks/useSetAddressData";

function SimpleClientCreate({ types, categories, zones }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lat, lng } = useSelector((store) => store.mapAutocomplete);

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(clearAddress());
  };

  const [createClient, { isLoading: l1, isError: e1, error }] =
    usePostClientSimpleMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      dni: "",
      clientType: "63b34fef55257d408a217911",
      clientCategory: "636a8e3e8b0abe9de10c7948",

      //ADDRESS
      address: "",
      department: "",
      flor: "",
      province: "",
      city: "",
      zip: undefined,
      deliveryZone: "",
      type: "",
      lat: undefined,
      lng: undefined,
    },
    onSubmit: async (values) => {
      try {
        const clientAddress = {
          address: values.address,
          department: values.department,
          flor: values.flor,
          province: values.province,
          city: values.city,
          zip: values.zip,
          deliveryZone: values.deliveryZone,
          type: values.type,
          lat: lat,
          lng: lng,
        };
        const clientSimpleData = {
          //user
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: "abx321",
          //client
          clientCategory: values.clientCategory,
          clientType: values.clientType,
          cuit: values.dni,
          //address
          address: checked ? clientAddress : null,
        };

        const res = await createClient(clientSimpleData).unwrap();

        if (res.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cliente creado con éxito",
            showConfirmButton: false,
            timer: 2500,
          });
          navigate("/clientes/lista");
        }
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: checked
      ? createSimpleClientAddressSchema
      : createSimpleClientSchema,
  });

  useSetAddressData(
    formik.values.address,
    formik.values.city,
    formik.values.province,
    formik.values.zip
  );

  return (
    <MDBox pt={4} pb={3}>
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
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ width: "50%" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  label="Nombre/s"
                  name="name"
                  error={!!formik.errors.name}
                  helperText={formik.errors.name}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="lastName"
                  label="Apellido"
                  error={!!formik.errors.lastName}
                  helperText={formik.errors.lastName}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phone"
                  label="Telefono"
                  error={!!formik.errors.phone}
                  helperText={formik.errors.phone}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Email (opcional)"
                  name="email"
                  error={!!formik.errors.email}
                  helperText={formik.errors.email}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box sx={{ width: "50%" }}>
                <TextField
                  margin="normal"
                  type="number"
                  fullWidth
                  name="dni"
                  label="DNI (opcional)"
                  error={!!formik.errors.dni}
                  helperText={formik.errors.dni}
                  onChange={formik.handleChange}
                />

                <TextField
                  margin="normal"
                  required
                  select
                  name="clientType"
                  fullWidth
                  label="Tipo de cliente"
                  value={formik.values.clientType}
                  error={!!formik.errors.clientType}
                  helperText={formik.errors.clientType}
                  onChange={formik.handleChange}
                >
                  {types.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.clientType}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  margin="normal"
                  required
                  select
                  name="clientCategory"
                  fullWidth
                  label="Categoría de cliente"
                  value={formik.values.clientCategory}
                  error={!!formik.errors.clientCategory}
                  helperText={formik.errors.clientCategory}
                  onChange={formik.handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.clientCategory}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Agregar dirección"
              sx={{ display: "inline" }}
            />

            {checked && (
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 3,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "50%" }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="address"
                    label="Dirección"
                    error={!!formik.errors.address}
                    helperText={formik.errors.address}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="department"
                    label="Departamento (opcional)"
                    error={!!formik.errors.department}
                    helperText={formik.errors.department}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="flor"
                    label="Piso (opcional)"
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
                </Box>

                <Box sx={{ width: "50%" }}>
                  <MapAutoComplete />
                </Box>
              </Box>
            )}
            <br />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={l1}
              sx={{
                mt: 1,
                mb: 2,
                mr: 2,
                backgroundColor: `${colors.info.main}`,
                color: "white !important",
              }}
            >
              Crear
            </LoadingButton>
            <MDButton
              variant="outlined"
              color="info"
              onClick={() => navigate(-1)}
              sx={{
                mt: 1,
                mb: 2,
              }}
            >
              Cancelar
            </MDButton>
            {e1 && (
              <Alert severity="error">
                {error
                  ? JSON.stringify(error.data.msg)
                  : "Error — Cliente no creado"}
              </Alert>
            )}
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default SimpleClientCreate;
