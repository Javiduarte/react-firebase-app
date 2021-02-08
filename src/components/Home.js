import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Footer from "./Footer";
import Loader from "./Loader";
import useStyles from "../UITemplate";
import Header from "./Header";
import AlertDialog from "./AlertDialog";
import AlertMessage from "./AlertMessage";
import { taskServices } from "../api";
import Icon from "./Icon";

function Home() {
  const classes = useStyles();

  const [tareas, setTareas] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [tareId, setTareaId] = useState("");

  const handleOpenDeleteDialog = (id) => {
    setOpenConfirm(true);
    setTareaId(id);
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };

  const obtenerDatos = () => {
    taskServices.findAll().then(
      (data) => {
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTareas(arrayData);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const borrarTarea = () => {
    taskServices.remove(tareId).then(
      (data) => {
        const arrayFiltrado = tareas.filter((item) => item.id !== tareId);
        setTareas(arrayFiltrado);
        handleClose();
        setShowMessage(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleDelete = () => {
    borrarTarea();
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Tasks Manager App
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              version 1.0
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button size="large" variant="contained" color="primary">
                    <Icon name={"Add"} />
                    Create new task
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container justify="center">
            {tareas.length === 0 && <Loader color={"primary"} />}
          </Grid>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {tareas.map((tarea) => (
              <Grid item key={tarea.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent
                    className={
                      tarea.status === "DONE"
                        ? classes.cardContentDone
                        : tarea.status === "IN PROGRESS"
                        ? classes.cardContentInprogress
                        : classes.cardContent
                    }
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      <Chip
                        label={tarea.status}
                        variant="outlined"
                        icon={<DoneIcon />}
                      />
                    </Typography>
                    <Typography>{tarea.name}</Typography>
                  </CardContent>
                  <CardActions className={classes.controlRight}>
                    <Tooltip title="Edit">
                      <IconButton aria-label="edit" className={classes.expand}>
                        <EditRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleOpenDeleteDialog(tarea.id)}
                        aria-label="delete"
                        className={classes.expand}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
      <AlertDialog
        isOpen={openConfirm}
        handleNo={handleClose}
        handleYes={handleDelete}
        title={"Delete Task"}
        content={"Are you sure you want to delete?"}
      />
      <AlertMessage
        severity={"success"}
        isOpen={showMessage}
        handleClose={() => setShowMessage(false)}
        message={"Task has been deleted successfully!"}
      />
    </>
  );
}
export default Home;
