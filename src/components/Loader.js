import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader({ color = "secondary" }) {
  return <CircularProgress color={color} disableShrink />;
}
