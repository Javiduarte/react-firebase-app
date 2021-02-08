import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./components/Home";

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
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
