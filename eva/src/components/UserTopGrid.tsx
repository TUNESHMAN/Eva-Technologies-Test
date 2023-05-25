import React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Button } from "@mui/material";

interface ButtonProps {
  showModal: () => void;
}

const UserTopGrid = (props: ButtonProps) => {
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justifyContent="space-between"
      marginTop={"15px"}
      alignItems="center"
    >
      <Grid item>
        <Typography
          fontFamily={"Inter"}
          color="#000000"
          fontSize={"20px"}
          fontWeight={600}
          fontStyle={"normal"}
        >
          User Listing Page
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          sx={{
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: 400,
            fontStyle: "normal",
            textTransform: "none",
          }}
          onClick={props.showModal}
        >
          Create User
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserTopGrid;
