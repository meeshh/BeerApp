import { Directions, LocationOn } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";

type BreweryAddressProps = {
  address?: string;
  latitude?: string;
  longitude?: string;
};

const BreweryAddress: React.FC<BreweryAddressProps> = ({
  address,
  latitude,
  longitude,
}) => {
  if (!address) {
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
          <LocationOn />
          {address}
        </Typography>
      </Grid>
      {latitude && longitude && (
        <Grid item sx={{ alignItems: "center" }}>
          <IconButton
            color="primary"
            sx={{ padding: 0 }}
            href={`https://www.google.com/maps/dir//${latitude},${longitude}/@${latitude},${longitude},17z`}
            target="_blank"
            rel="noreferrer"
          >
            <Directions />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default BreweryAddress;
