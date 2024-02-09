import { LocationOff, LocationOn } from "@mui/icons-material";
import React from "react";
import { MAPS_API } from "../../api/config";

const mapHeight = 600;

type BreweryMapProps = {
  cardWidth?: number;
  longitude?: string;
  latitude?: string;
};

const BreweryMap: React.FC<BreweryMapProps> = ({
  cardWidth,
  longitude,
  latitude,
}) => {
  if (!longitude || !latitude) {
    return (
      <div
        style={{
          width: "100%",
          height: mapHeight,
          position: "relative",
        }}
      >
        <LocationOff
          color="disabled"
          sx={{
            fontSize: 150,
            position: "absolute",
            display: "block",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: mapHeight,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url(https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},15,0,0/${cardWidth}x${mapHeight}?access_token=${MAPS_API})`,
        position: "relative",
      }}
    >
      <LocationOn
        fontSize="large"
        color="error"
        sx={{
          position: "absolute",
          display: "block",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default BreweryMap;
