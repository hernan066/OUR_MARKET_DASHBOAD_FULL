import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import Swal from "sweetalert2";
import { usePostDeliveryTruckMutation } from "api/deliveryTruckApi";
import { createDeliveryTruckSchema } from "validations/deliveryTruck/createDeliveryTruckYup";

function DeliveryTruckCreate() {
  const navigate = useNavigate();

  const [createDeliveryTruck, { isLoading, isError: e1, error }] =
    usePostDeliveryTruckMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      dni: "",
      // repartidor
      truckId: "",
      patent: "",
      coldChamber: "",
      maximumLoad: undefined,
    },
    onSubmit: async (values) => {
      const data = {
        ...values,
        truckId: `${values.name}_${values.patent}`,
      };
      await createDeliveryTruck({ ...data }).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Repartidor creado con éxito",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/distribucion/repartidores/lista");
    },
    validationSchema: createDeliveryTruckSchema,
  });

  return (
    <MDBox pt={5} pb={3}>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
        }}
      >
        <Box sx={{ mx: 2, display: "flex", width: "100%", gap: 3 }}>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ width: "100%" }}
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
                    name="password"
                    label="Password"
                    type="password"
                    error={!!formik.errors.password}
                    helperText={formik.errors.password}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    error={!!formik.errors.email}
                    helperText={formik.errors.email}
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
                </Box>
                <Box sx={{ width: "50%" }}>
                  <TextField
                    margin="normal"
                    type="number"
                    fullWidth
                    required
                    name="dni"
                    label="DNI/CUIL"
                    error={!!formik.errors.dni}
                    helperText={formik.errors.dni}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="patent"
                    label="Patente"
                    error={!!formik.errors.patent}
                    helperText={formik.errors.patent}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    type="number"
                    name="maximumLoad"
                    label="Carga maxima"
                    error={!!formik.errors.maximumLoad}
                    helperText={formik.errors.maximumLoad}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    select
                    name="coldChamber"
                    fullWidth
                    label="Cámara de frio"
                    value={formik.values.coldChamber}
                    error={!!formik.errors.coldChamber}
                    helperText={formik.errors.coldChamber}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="true">Si</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </TextField>
                  <TextField
                    margin="normal"
                    fullWidth
                    disabled
                    name="truckId"
                    label="ID Repartidor"
                    value={`${formik.values.name}_${formik.values.patent}`}
                    error={!!formik.errors.truckId}
                    helperText={formik.errors.truckId}
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>

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
              Crear
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

export default DeliveryTruckCreate;
