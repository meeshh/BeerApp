import { Paper, Typography } from "@mui/material";
import { FC } from "react";
import { OFFLINE_SECTION_HEIGHT } from "../../styles/constants";

type OfflineProps = {
  isOnline: boolean;
};

const Offline: FC<OfflineProps> = ({ isOnline }) => {
  return isOnline ? null : (
    <article style={{ height: OFFLINE_SECTION_HEIGHT }}>
      <Paper
        component="section"
        elevation={3}
        sx={{ padding: 4, backgroundColor: "warning.main" }}
      >
        <Typography variant="h5" gutterBottom component="header">
          You are offline
        </Typography>
        <Typography variant="body1" gutterBottom component="main">
          App needs internet to start working
        </Typography>
      </Paper>
    </article>
  );
};

export default Offline;
