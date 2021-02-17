import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import useStyles from "../UITemplate";
import CardsGrid from "./CardsGrid";
import AddCard from "./AddCard";
import Loader from "../components/Loader";
import { taskServices } from "../api";

function Home() {
  const classes = useStyles();
  const [tareas, setTareas] = useState([]);

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

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
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
          <AddCard setTareas={setTareas} />
        </Container>
      </div>
      <Grid container justify="center">
        {tareas.length === 0 && <Loader color={"primary"} />}
      </Grid>
      {tareas && <CardsGrid tareas={tareas} setTareas={setTareas} />}
    </main>
  );
}
export default Home;
