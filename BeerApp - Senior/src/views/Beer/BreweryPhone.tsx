import { Phone } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";

type BreweryPhoneProps = {
  phone?: string;
};

const BreweryPhone: React.FC<BreweryPhoneProps> = ({ phone }) => {
  if (!phone) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid item flexGrow={1}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            mb: 1,
          }}
        >

          {phone}
        </Typography>
      </Grid>

      <Grid item sx={{ alignItems: "center" }}>
        <IconButton
          color="primary"
          sx={{ padding: 0 }}
          href={`tel:${phone.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noreferrer"
        >
          <Phone />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default BreweryPhone;
