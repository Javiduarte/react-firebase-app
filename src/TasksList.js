import React, { useState, useEffect } from "react";

import { firebase } from "./firebase";
import "./App.css";
const initTarea = {
  name: "",
  status: "TODO",
};

function TasksList() {
  const [tarea, setTarea] = useState(initTarea);
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [showForm, setshowForm] = useState(false);

  const obtenerDatos = async () => {
    const db = firebase.firestore();
    try {
      const data = await db.collection("tareas").get();
      const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(arrayData);
      setTareas(arrayData);
    } catch (error) {
      console.log(error);
    }
  };

  const Guardar = async (e) => {
    e.preventDefault();
    if (!tarea.name.trim()) {
      console.log("sin texto");
      return;
    }
    console.log(tarea);

    // Llamada a la api para agregar con .add()
    try {
      const db = firebase.firestore();
      const data = await db.collection("tareas").add(tarea);
      obtenerDatos();
      setshowForm(false);
      setTarea(initTarea);
    } catch (error) {
      console.log(error);
    }
  };
  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("tareas").doc(id).delete();
      const arrayFiltrado = tareas.filter((item) => item.id !== id);
      setTareas(arrayFiltrado);
    } catch (error) {
      console.log(error);
    }
  };
  const activarEdicion = (item) => {
    setModoEdicion(true);
    setTarea(item);
    setId(item.id);
    setshowForm(true);
  };
  const editar = async (e) => {
    e.preventDefault();
    if (!tarea.name.trim()) {
      console.log("vacio");
      return;
    }
    try {
      const db = firebase.firestore();
      await db.collection("tareas").doc(id).update(tarea);
      obtenerDatos();
      setModoEdicion(false);
      setId("");
      setTarea(initTarea);
      setshowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setModoEdicion(false);
    setshowForm(!showForm);
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <div className="container mb-2">
      <div className="row">
        <div className="col-md-12">
          <a href="#" onClick={handleCancel} className="float-right">
            {showForm ? "Cancelar" : "+ Agregar Tarea"}
          </a>

          {!showForm && (
            <>
              <h1>Lista de Tareas</h1>

              <ul className="list-group">
                {tareas.map((item) => (
                  <li className="list-group-item" key={item.id}>
                    <span>{item.name}</span>
                    <span class="badge badge-primary badge-pill">
                      {item.status}
                    </span>

                    <button
                      className="btn btn-danger btn-sm float-right"
                      onClick={() => {
                        if (window.confirm("Estás seguro que deseas eliminar?"))
                          eliminar(item.id);
                      }}
                    >
                      <i className="fa-trash-alt"></i> Eliminar
                    </button>

                    <button
                      className="btn btn-warning btn-sm float-right mr-2"
                      onClick={() => activarEdicion(item)}
                    >
                      Editar
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="col-md-12">
          {showForm && (
            <>
              <h3>{modoEdicion ? "Editar Tarea" : "Agregar Tarea"}</h3>
              <form onSubmit={modoEdicion ? editar : Guardar}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Ingrese Nombre de la Tarea"
                  value={tarea.name}
                  onChange={(e) => setTarea({ ...tarea, name: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Ingrese Estado de la Tarea"
                  value={tarea.status}
                  onChange={(e) =>
                    setTarea({ ...tarea, status: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className={
                    modoEdicion
                      ? "btn btn-warning btn-block btn-sm"
                      : "btn btn-dark btn-block btn-sm"
                  }
                >
                  {modoEdicion ? "Editar" : "Guardar"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TasksList;
