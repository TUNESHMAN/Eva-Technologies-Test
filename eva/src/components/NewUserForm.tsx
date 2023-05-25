import React from "react";
import { useFormik } from "formik";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

// Prop types
type NewUserFormProps = {
  modalState: boolean;
  close: () => void;
};

const NewUserForm = (props: NewUserFormProps) => {
  // Validation schema
  const validationSchema = yup.object({
    firstName: yup.string().required("Enter first name"),
    lastName: yup.string().required("Enter last name"),
    age: yup.number().required("Enter age"),
    email: yup.string().email("Enter a valid email").required("Enter email"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let response = await axios.post(
          "https://mockend.com/api/pgilgunn/coding-test/users",
          values
        );
        if (response.status === 201) {
          toast.success(`User ${response.data.id} created successfully`);
          props.close();
        }
      } catch (error: any) {
        toast.error(`${error.message}`);
        throw error;
      }
    },
  });

  return (
    <>
      <Modal
        open={props.modalState}
        onClose={props.close}
        aria-labelledby="create-user-modal"
        aria-describedby="create-user-description"
        keepMounted
      >
        <Box sx={style}>
          <Grid
            container
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            paddingTop={0.5}
          >
            <Grid item>
              <Typography
                fontFamily={"Inter"}
                color="#000000"
                fontSize={"20px"}
                fontWeight={600}
                fontStyle={"normal"}
              >
                Create New User
              </Typography>
            </Grid>

            <Grid item>
              <IconButton size="small" aria-label="close" onClick={props.close}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" marginTop={2}>
            <Grid item>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontStyle: "normal",
                    paddingBottom: "20px",
                  }}
                  fullWidth
                  label="First Name"
                  placeholder="First Name"
                  variant="standard"
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontStyle: "normal",
                    paddingBottom: "20px",
                  }}
                  fullWidth
                  placeholder="Last Name"
                  label="Last Name"
                  variant="standard"
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontStyle: "normal",
                    paddingBottom: "20px",
                  }}
                  fullWidth
                  placeholder="Email Address"
                  variant="standard"
                  label="Email Address"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontStyle: "normal",
                    paddingBottom: "25px",
                  }}
                  type="number"
                  fullWidth
                  placeholder="Age"
                  variant="standard"
                  label="Age"
                  id="age"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    textTransform: "none",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Create User
                </Button>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default NewUserForm;
