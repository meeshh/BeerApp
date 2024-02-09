import { Avatar, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const avatarWrapperSize = 72

type BeerLabelProps = {
  name?: string;
  breweryType?: string;
  avatarSize?: number;
};

const BeerLabel: React.FC<BeerLabelProps> = ({
  name,
  breweryType,
  avatarSize,
}) => {
  if (!name) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 16,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        color: "white",
        position: "absolute",
        top: "10%",
        left: 0,
        zIndex: 1,
      }}
    >
      <Avatar
        src={`/icons/favicon-${avatarSize}.png`}
        imgProps={{ style: { width: '60%', height: '60%' } }}
        sx={{ width: avatarWrapperSize, height: avatarWrapperSize, backgroundColor: grey[500] }}
      />
      <Typography variant="h4" color="Menu" textAlign={"center"} mb={1}>
        {name}
      </Typography>
      <Typography variant="body1">{breweryType}</Typography>
    </div>
  );
};

export default BeerLabel;
