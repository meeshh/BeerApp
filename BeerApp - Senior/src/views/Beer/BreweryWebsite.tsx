import { OpenInNew } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";

type BreweryWebsiteProps = {
  website?: string;
};

const BreweryWebsite: React.FC<BreweryWebsiteProps> = ({ website }) => {
  if (!website) return null;

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
          {website}
        </Typography>
      </Grid>

      <Grid item sx={{ alignItems: "center" }}>
        <IconButton
          color="primary"
          sx={{ padding: 0 }}
          href={website}
          target="_blank"
          rel="noreferrer"
        >
          <OpenInNew />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default BreweryWebsite;
