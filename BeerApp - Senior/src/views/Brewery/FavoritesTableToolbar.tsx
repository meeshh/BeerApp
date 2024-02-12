import { DeleteSweep } from "@mui/icons-material";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { FavoritesContext } from "../../contexts/FavoritesContext";

const FavoritesTableToolbar = () => {
  const { setSelectedFavorites } = React.useContext(FavoritesContext);
  const handleRemoveAll = () => {
    setSelectedFavorites([]);
    localStorage.removeItem("selectedBreweries");
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: "secondary.main",
        color: "primary",
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" style={{ flex: "1 1 100%" }}>
        Favorites
      </Typography>
      <Tooltip title="Delete all">
        <IconButton size="large" onClick={handleRemoveAll}>
          <DeleteSweep />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default FavoritesTableToolbar;
