import { Box, Toolbar } from "@mui/material";
import TopBar from "../TopBar";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

export default function ResponsiveDrawer(props: Readonly<Props>) {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <TopBar drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)`, background: "#f7f7f7" },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
