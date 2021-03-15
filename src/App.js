import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./pages/Home";
import Header from "./components/Header";
import { NotificationProvider } from "./contexts";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#4791db",
        main: "#1976d2",
        dark: "#115293",
      },
    },
  });

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <Header />
          <Home />
        </NotificationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
