import { Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import { CircleFlag } from "react-circle-flags";
import { getCountryCode } from "../../utils/country";
import { Flag } from "@mui/icons-material";

type BreweryLocationProps = {
  country?: string;
  city?: string;
  state?: string;
};

const BreweryLocation: React.FC<BreweryLocationProps> = ({
  country,
  city,
  state,
}) => {
  if (!country) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid item flexGrow={1}>
        <Tooltip title={country}>
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
            <Flag />
            {city ? city + "," : ""} {state}
          </Typography>
        </Tooltip>
      </Grid>

      <Grid item>
        <CircleFlag
          height={22}
          countryCode={getCountryCode(country).toLowerCase()}
        />
      </Grid>
    </Grid>
  );
};

export default BreweryLocation;
