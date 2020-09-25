import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./BuyButton.css";

function BuyButton(id, title, image, price, rating) {
  const [{basket}, dispatch] = useStateValue();

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
  return (
    <Link to="/order">
      <div className="buyButton" onClick={addToBasket}>
        <h2>Buy</h2>
      </div>
    </Link>
  );
}

export default BuyButton;
