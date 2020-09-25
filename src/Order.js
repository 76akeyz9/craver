import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "./Order.css";

function Order() {
  const [{ basket }, dispatch] = useStateValue();
  basket.id = {
    id: "1234",
    image:
      "https://firebasestorage.googleapis.com/v0/b/craver-react-7590b.appspot.com/o/images%2Fchocolate-3.jpg?alt=media&token=ac5d2da1-5531-429b-ba44-56c9a5ef661a",
  };

  // Need to write error protection which avoid directly access to "order" url.

  // useEffect(() => {
  //   console.log("BASKET IS >>> ", basket);
  //   if (basket) {
  //     console.log("BASKET IS NOT EMPTY")
  //   } else {
  //     window.location.href = "/";
  //     console.log("BASKET IS EMPTY")
  //   }
  // }, []);

  return (
    <div className="order">
      <div className="order__head">
        <h1>this is order head</h1>
      </div>
      <div className="order__container">
        <img className="order__image" src={basket.id.image}></img>
      </div>
      <div className="order__container">
        <img className="order__image" src={basket.id.image}></img>
      </div>
      <div className="order__caption">
        〇〇さんに投げ銭でお礼を伝えませんか？投げ銭分は合計代金から割引されます！
      </div>
      <div className="order_tip_bar"></div>
      <div className="order_total">Total 5,000</div>
      <div className="order_next">次へ</div>
    </div>
  );
}

export default Order;
