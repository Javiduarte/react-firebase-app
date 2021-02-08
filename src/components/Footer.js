import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import useStyles from "../UITemplate";

function Footer() {
  const { footer } = useStyles();
  return (
    <footer className={footer}>
      {/* <Typography variant="h6" align="center" gutterBottom>
        Created By Ariel Duarte
      </Typography> */}
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Powered By MaterialUI!
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://www.linkedin.com/in/arielduarte"
          target="_blank"
        >
          Ariel Duarte
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
}

export default Footer;
