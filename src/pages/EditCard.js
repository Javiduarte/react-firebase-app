import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { useNotification, useGlobal } from "../hooks";
import { taskServices } from "../api";

import ModalForm from "../components/ModalForm";

const initTarea = {
  name: "",
  status: "",
};

const EditCard = ({ isOpen, handleClose, tareaEdit, setTareas }) => {
  const [tarea, setTarea] = useState(initTarea);
  const [glbState] = useGlobal();
  const alert = useNotification();
  const statuses = glbState.taskStatuses;

  useEffect(() => {
    if (tareaEdit) {
      setTarea(tareaEdit);
    }
  }, [tareaEdit]);

  const handleInputChange = ({ target }) => {
    setTarea({
      ...tarea,
      [target.name]: target.value,
    });
  };

  const showMessage = () => {
    alert({
      isOpen: true,
      message: "Card was added succesfully.",
      severity: "success",
    });
  };

  const editTarea = () => {
    taskServices.edit(tarea).then(
      (data) => {
        setTareas((tareasList) =>
          tareasList.map((item) =>
            item.id === tarea.id
              ? { ...item, name: tarea.name, status: tarea.status }
              : { ...item }
          )
        );
        handleClose();
        showMessage();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <ModalForm
        isOpen={isOpen}
        title={"Edit Task"}
        handleClose={handleClose}
        onSubmit={editTarea}
        loading={false}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              variant="outlined"
              fullWidth
              label="Task Name"
              onChange={handleInputChange}
              value={tarea.name}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="status-label-id">Status</InputLabel>
            <Select
              name="status"
              fullWidth
              variant="outlined"
              labelId="status-label-id"
              id="status-label-id"
              onChange={handleInputChange}
              value={tarea.status}
              label="Status"
            >
              {statuses.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </ModalForm>
    </>
  );
};

export default EditCard;
