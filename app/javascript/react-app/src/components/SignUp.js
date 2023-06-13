import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MsgBar from "./Base/MsgBar";
import { SignUpUser } from "./services/Config";

export default function SignUp() {
  const [alert, setAlert] = useState({
    data: "",
    state: false,
  });
  const [credential, setCredential] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("set", credential);
    if (
      credential.firstName == "" ||
      credential.lastName == "" ||
      credential.email == "" ||
      credential.password == "" ||
      credential.confirmpassword == ""
    ) {
      setAlert({
        data: "Please fill fields",
        state: true,
      });
      setTimeout(() => {
        setAlert({
          data: "",
          state: false,
        });
      }, 3000);
    } else if (!/.+@.+\.[A-Za-z]+$/.test(credential.email) === true) {
      setAlert({
        data: "Please fill valid email address",
        state: true,
      });
      setTimeout(() => {
        setAlert({
          data: "",
          state: false,
        });
      }, 3000);
    } else if (credential.password.length < 6) {
      setAlert({
        data: "you have to enter at least 6 digit!",
        state: true,
      });
      setTimeout(() => {
        setAlert({
          data: "",
          state: false,
        });
      }, 3000);
    } else {
      try {
        const result = await SignUpUser(credential);
        console.log("result", result);
        setAlert({
          data: "Registration Successfully",
          state: true,
        });
        setTimeout(() => {
          setAlert({
            data: "",
            state: false,
          });
          navigate("/login");
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };
  return (
    <Container component="main" maxWidth="xs">
      {alert.state && <MsgBar errMsg={alert.data} color={"Green"} />}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                label="First Name"
                autoFocus
                value={credential.firstName}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={credential.lastName}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                value={credential.email}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={credential.password}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => navigate("/login")}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
