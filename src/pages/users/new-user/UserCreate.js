/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import apiRequest from "api/apiRequest";
import { creteUserSchema } from "validations/users/createUserYup";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";

function UserCreate({ roles }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    },
    onSubmit: async ({ name, lastName, email, password, phone, role }) => {
      setIsLoading(true);
      try {
        const { data } = await apiRequest.post("/user", {
          name,
          lastName,
          email,
          phone,
          password,
          role,
          verified: true,
        });
        if (data.ok) {
          /*  Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario creado",
            showConfirmButton: false,
            timer: 2000,
          }); */
          setError([]);
          navigate("/usuarios/lista");
        }
        setIsLoading(false);
      } catch (err) {
        await setError(err.response.data);

        setIsLoading(false);
      }
    },
    validationSchema: creteUserSchema,
  });

  return (
    <MDBox pt={6} pb={3}>
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
              label="Email"
              name="email"
              error={!!formik.errors.email || error.email?.msg}
              helperText={formik.errors.email || error.email?.msg}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Telefono"
              error={!!formik.errors.phone || error.phone?.msg}
              helperText={formik.errors.phone || error.phone?.msg}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              select
              name="role"
              fullWidth
              label="Rol"
              value={formik.values.role}
              error={!!formik.errors.role}
              helperText={formik.errors.role}
              onChange={formik.handleChange}
            >
              {roles.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.role}
                </MenuItem>
              ))}
            </TextField>
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
          </Box>
        </Box>
      </Box>
    </MDBox>
  );
}

export default UserCreate;
