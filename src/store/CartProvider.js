import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //want to check if an item is already a part of the cart
    //i will reach out to my exisitng items in the cart
    //in where i call find index , which is a built-in method in
    //javascript which finds the index of an item in an array
    //now it takes function which returns true if tha's the item
    //we are looking for and false otherwise because this function
    //will be executed for every item in the array.
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const exisitingCartItem = state.items[exisitingCartItemIndex];
    let updatedItems;
    let updatedItem;
    //here i will copy the exisiting cart item but the amount
    //change if we have sushi in our cart and then added sushi
    //again it will update the amount of sushi orderd
    if (exisitingCartItem) {
      const updatedItem = {
        ...exisitingCartItem,
        amount: exisitingCartItem.amount + action.item.amount,
      };
      //updateditems is now equal to new array where i copy the
      //existing items so that i can update it without editing
      //the old array in memory hence im creating a new array
      //where i copy the old objects and then for this existing
      //cart index i ovveride this with the updated item
      // so i pick the old item which we identified in the cart item
      // array (eg:sushi) and i override it with this update item

      //this is what i don if an item is already part of the cart array
      updatedItems = [...state.items];
      updatedItems[exisitingCartItemIndex] = updatedItem;
    }
    // an item is added for the first time
    else {
      updatedItem = { ...action.item };
      updatedItems = state.items.concat(action.item);
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[exisitingCartItemIndex];
    const updatedTotalAmount =state.totalAmount - existingItem.price;
    let updatedItems;
    if(existingItem.amount === 1){
        //filter is built-in method that returns a new array
        //filtered by applying specific conditions
        //we pass a function to filter which is executed for every
        //item in the array and that function recieves the item
        //and it if returned true here we keep the item in the 
        //newly returned array if it returned false we get rid of it 

        //here we make sure that all items where the id is not equal
        //to the id of the item we want to remove are kept, but the one
        //item where the item id is equal to the id of the action 
        //which is the to-be-removed id.we remove that item from 
        //the newly gennerated array
        updatedItems =state.items.filter(item => item.id !== action.id );
    }
    //if the amount is greater than one we dont remove the whole item
    //but reduce its amount
    else {
        const updatedItem = {...existingItem, amount:existingItem.amount -1};
        //to create a new array with the old items 
        updatedItems=[...state.items];
        //but we override one of these items the item for that
        //index we got here where we then override the old item in the array
        //with the updated item which has the updated amount
        updatedItems[exisitingCartItemIndex] = updatedItem;
    }
    //here we return a new state object where items is updated items
    //
    return {
        items:updatedItems,
        totalAmount:updatedTotalAmount

    }
  }

  if(action === 'CLEAR'){
    return defaultCartState;
  };

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () =>{
    dispatchCartAction({ type: "CLEAR"});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart:clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
