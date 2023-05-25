import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  id: number;
}

const Users = () => {
  // States for the users
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetching the users from the API
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://mockend.com/api/pgilgunn/coding-test/users"
      );
      setIsLoading(false);
      setUsers(response.data);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`${error.message}`);
    }
  };

  // Side effect to fetch the users
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25px",
          }}
        >
          {" "}
          <CircularProgress />
        </div>
      ) : (
        <Grid sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {users.map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ textAlign: "center" }}
                      variant="h5"
                      component="h2"
                    >
                      {user.id}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Users;
