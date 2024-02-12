import { AppBar, Avatar, Toolbar } from "@mui/material";
interface Props {
  drawerWidth: number;
}

const TopBar = (props: Props) => {
  return (
    <AppBar
      sx={{
        width: { sm: "100%" },
        ml: { sm: `${props.drawerWidth}px` },
      }}
    >
      <Toolbar>
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
          src="/icons/favicon-32x32.png"
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
