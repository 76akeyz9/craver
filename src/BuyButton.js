import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./BuyButton.css";
import Button from "@material-ui/core/Button";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { blue, green, purple, yellow } from "@material-ui/core/colors";

function BuyButton(id, title, image, price, rating) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        image: image,
        // title: title,
        // price: price,
        // rating: rating,
      },
    });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(3),
      },
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Link to="/order">
        <button className="buyButton" onClick={addToBasket}>
          BUY
        </button>
      </Link>
    </div>
  );
}

export default BuyButton;

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#fdd835',
//     },
//     secondary: {
//       main: '#ffee58',
//     },
//   },
// });
