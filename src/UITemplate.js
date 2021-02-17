import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  controlRight: {
    display: "flex",
  },
  expand: {
    marginLeft: "auto",
  },
  cardContent: {
    flexGrow: 1,
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.getContrastText(theme.palette.error.main),
  },
  cardContentInprogress: {
    flexGrow: 1,
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.getContrastText(theme.palette.error.main),
  },
  cardContentDone: {
    flexGrow: 1,
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.getContrastText(theme.palette.error.main),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  deleteButton: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    background: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  successButton: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    background: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
    },
  },
  blueButton: {
    color: theme.palette.getContrastText(theme.palette.info.main),
    background: theme.palette.info.main,
    "&:hover": {
      backgroundColor: theme.palette.info.light,
    },
  },
  warningButton: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    background: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.light,
    },
  },
}));

export default useStyles;
