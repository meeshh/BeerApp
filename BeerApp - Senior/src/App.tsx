import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import Router from "./router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
