/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import Swal from "sweetalert2";
import { usePostExpensesMutation } from "api/expensesApi";
import { createExpensesSchema } from "validations/expenses/createExpesesYup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function ExpensesCreate() {
  const navigate = useNavigate();
  const [createExpenses, { isLoading, isError }] = usePostExpensesMutation();

  const formik = useFormik({
    initialValues: {
      expensesName: "",
      category: "",
      other: "",
      amount: undefined,
      date: "",
    },
    onSubmit: async (values) => {
      const res = await createExpenses(values).unwrap();
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Nuevo gasto cargado con éxito",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/gastos/lista");
      }
    },
    validationSchema: createExpensesSchema,
  });

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
          sx={{ mx: 2, width: "100%" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              autoFocus
              label="Fecha de gasto"
              format="DD/MM/YYYY"
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue("date", value, true)}
              slotProps={{
                textField: {
                  variant: "outlined",
                  error: Boolean(formik.errors.date),
                  helperText: formik.errors.date,
                  autoFocus: true,
                  required: true,
                },
              }}
              sx={{ width: "100%", marginTop: 2 }}
            />
          </LocalizationProvider>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Gasto"
            name="expensesName"
            error={!!formik.errors.expensesName}
            helperText={formik.errors.expensesName}
            onChange={formik.handleChange}
          />
          <TextField
            margin="normal"
            required
            select
            name="category"
            fullWidth
            label="Categoria de gasto"
            value={formik.values.category}
            error={!!formik.errors.category}
            helperText={formik.errors.category}
            onChange={formik.handleChange}
          >
            <MenuItem value="alquiles">Alquiler</MenuItem>
            <MenuItem value="distribucion">Distribución</MenuItem>
            <MenuItem value="sueldos">Sueldos</MenuItem>
            <MenuItem value="impuestos">Impuestos</MenuItem>
            <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
            <MenuItem value="procesos">Procesos</MenuItem>
            <MenuItem value="otros">Otros (especifica abajo)</MenuItem>
          </TextField>

          <TextField
            margin="normal"
            fullWidth
            label="Especifica otra categoria gasto"
            name="other"
            error={!!formik.errors.other}
            helperText={formik.errors.other}
            onChange={formik.handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            number
            label="Monto"
            name="amount"
            error={!!formik.errors.amount}
            helperText={formik.errors.amount}
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
            Cargar
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
          {isError && <Alert severity="error">Error — Gasto no creado</Alert>}
        </Box>
      </Box>
    </MDBox>
  );
}

export default ExpensesCreate;
