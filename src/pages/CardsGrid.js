import React, { useState } from "react";
import PropTypes from "prop-types";
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
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "../UITemplate";
import AlertDialog from "../components/AlertDialog";
import AlertMessage from "../components/AlertMessage";
import { taskServices } from "../api";

const statuses = [
  { name: "TODO", value: "TODO" },
  { name: "IN PROGRESS", value: "INPROGRESS" },
  { name: "DONE", value: "DONE" },
];

const CardsGrid = ({ tareas, setTareas }) => {
  const classes = useStyles();
  const [tareId, setTareaId] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleOpenDeleteDialog = (id) => {
    setOpenConfirm(true);
    setTareaId(id);
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };

  const borrarTarea = () => {
    taskServices.remove(tareId).then(
      (data) => {
        setTareas(tareas.filter((item) => item.id !== tareId));
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

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {tareas.map((tarea) => (
          <Grid item key={tarea.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent
                className={
                  tarea.status === "DONE"
                    ? classes.cardContentDone
                    : tarea.status === "INPROGRESS"
                    ? classes.cardContentInprogress
                    : classes.cardContent
                }
              >
                <Typography gutterBottom variant="h5" component="h2">
                  <Chip
                    label={
                      statuses.find((item) => item.value === tarea.status).name
                    }
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
        message={"Task has been deleted successfully!"}
      />
    </Container>
  );
};

CardsGrid.defaultProps = {
  tareas: [],
};

CardsGrid.propTypes = {
  tareas: PropTypes.array.isRequired,
  setTareas: PropTypes.func.isRequired,
};

export default CardsGrid;
