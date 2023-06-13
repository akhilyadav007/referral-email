import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import { Typography } from "@mui/material";
import { GetUser } from "./services/Config";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const result = GetUser().then((res) => {
      setData(res?.data);
    });
  }, []);

  let arr = [1, 2, 3, 4, 56, 56, 56, 56, 45];
  return (
    <Box>
      <Grid container>
        <Grid sx={{ height: 60, bgcolor: "#b1b2b3" }} container item xs={12}>
          <Typography
            sx={{ textAlign: "center", fontFamily: "fantasy" }}
            variant="h3"
          >
            Here All Referred Email
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ textAlign: "center", justifyContent: "center" }}>
        {data.map((val,index) => {
          return (
            <Grid
              sx={{ fontSize: 18, fontFamily: "sans-serif" ,mt:5}}
              key={val.id}
              item
            >
          {index+1} :- {val.email}
         
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HomePage;
