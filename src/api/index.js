import { firebase } from "./firebase";

const db = firebase.firestore();
const collectionName = "tareas";

function findAll() {
  return db.collection(collectionName).get();
}

function save(tarea) {
  return db.collection(collectionName).add(tarea);
}

function edit(tarea) {
  return db.collection(collectionName).doc(tarea.id).update(tarea);
}

function remove(id) {
  return db.collection(collectionName).doc(id).delete();
}

export const taskServices = {
  findAll,
  save,
  edit,
  remove,
};
