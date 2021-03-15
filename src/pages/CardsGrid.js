import React from "react";
import PropTypes from "prop-types";
import { Container, Card, Grid } from "@material-ui/core";
import useStyles from "../UITemplate";
import CardItem from "./CardItem";

const CardsGrid = ({ tareas, setTareas }) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {tareas.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardItem tareas={tareas} tarea={item} setTareas={setTareas} />
            </Card>
          </Grid>
        ))}
      </Grid>
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
