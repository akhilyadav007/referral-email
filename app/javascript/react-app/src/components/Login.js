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
import { LoginUser } from "./services/Config";
export default function Login() {
  const [alert, setAlert] = useState({
    data: "",
    state: false,
  });
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (credential.email == "" || credential.password == "") {
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
    } else {
      try {
        const result = await LoginUser(credential);
        localStorage.setItem("token", result.data.token);
        setAlert({
          data: "Login Successfully",
          state: true,
        });
        setTimeout(() => {
          setAlert({
            data: "",
            state: false,
          });
        }, 3000);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
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
          Login
        </Typography>
        <Box>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => handleChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => handleChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
