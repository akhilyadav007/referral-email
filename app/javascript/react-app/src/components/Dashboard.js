import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MsgBar from "./Base/MsgBar";
import EmailIcon from "@mui/icons-material/Email";
import { SendMail } from "./services/Config";
import Loader from "./Base/Loader";
export default function Dashboard() {
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({
    data: "",
    state: false,
  });
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email == "") {
      setAlert({
        data: "Please fill email",
        state: true,
      });
      setTimeout(() => {
        setAlert({
          data: "",
          state: false,
        });
      }, 3000);
    } else if (!/.+@.+\.[A-Za-z]+$/.test(email) === true) {
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
    } else {
      try {
        console.log("e", email);
        const result = await SendMail(email);
        console.log("result", result);
        setAlert({
          data: "Mail Sent Successfully",
          state: true,
        });
        setEmail("");
        setTimeout(() => {
          setAlert({
            data: "",
            state: false,
          });
        }, 3000);
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
      
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEmail = () => {
    navigate("/homepage");
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
          <EmailIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Send Mail
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <Grid>{loader && <Loader />}</Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Send
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
            onClick={handleEmail}
          >
            Go to HomePage
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
