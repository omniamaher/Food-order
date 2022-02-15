import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  //to get acces to that cart context
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHadnler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://foodapp-a1da9-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        {" "}
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHadnler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />
      )}
      {!isCheckOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfuly sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCloseCart}>
        Close
      </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
