import { AppBar, Avatar, Toolbar } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
interface Props {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const TopBar = (props: Props) => {
  return (
    <AppBar
      sx={{
        // width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        width: { sm: "100%" },
        ml: { sm: `${props.drawerWidth}px` },
      }}
    >
      <Toolbar>
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton> */}
        <Avatar
          variant="rounded"
          sx={{
            width: 32,
            height: 32,
            mr: {
              xs: 2,
              sm: 0,
            },
          }}
          src="/icons/favicon-32.png"
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
