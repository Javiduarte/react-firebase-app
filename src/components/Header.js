import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import ViewListIcon from "@material-ui/icons/ViewList";
import Typography from "@material-ui/core/Typography";
import useStyles from "../UITemplate";

function Header() {
  const { icon } = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <ViewListIcon className={icon} />
        <Typography variant="h6" color="inherit" noWrap>
          Tasks Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
