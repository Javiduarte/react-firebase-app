import React, { useContext, useState } from "react";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {
  CardActions,
  CardContent,
  Chip,
  Typography,
  Tooltip,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import { GlobalContext } from "../store";
import useStyles from "../UITemplate";
import AlertMessage from "../components/AlertMessage";
import AlertDialog from "../components/AlertDialog";
import { taskServices } from "../api";
import EditCard from "./EditCard";

const CardItem = ({ tarea, setTareas, tareas }) => {
  const [tareId, setTareaId] = useState("");
  const [glbState] = useContext(GlobalContext);
  const statuses = glbState.taskStatuses;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const classes = useStyles();

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
        // setShowMessage(true);
        setTareas(tareas.filter((item) => item.id !== tareId));
        handleClose();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleDelete = () => {
    borrarTarea();
  };

  const openEditModal = (tarea) => {
    setShowEdit(true);
    setSelected(tarea);
  };

  const handleCloseEditModal = () => {
    setShowEdit(false);
  };

  return (
    <>
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
            label={statuses.find((item) => item.value === tarea.status).name}
            variant="outlined"
            icon={<DoneIcon />}
          />
        </Typography>
        <Typography>{tarea.name}</Typography>
      </CardContent>
      <CardActions className={classes.controlRight}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => openEditModal(tarea)}
            aria-label="edit"
            className={classes.expand}
          >
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

      <EditCard
        isOpen={showEdit}
        handleClose={handleCloseEditModal}
        tareaEdit={selected}
        setTareas={setTareas}
      />

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
        handleClose={() => setShowMessage(false)}
      />
    </>
  );
};

export default CardItem;
