import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Offline = () => {
  const [isOnline, setIsOnline] = useState(true);

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.addEventListener("online", setOnline);
      window.addEventListener("offline", setOffline);
    };
  }, []);

  return isOnline ? null : (
    <article>
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
