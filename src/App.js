import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meal";
import Drink from "./components/Drinks/Drink";
import Dessert from "./components/Desserts/Dessert";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {

  const [cartshown,setIsCartshown]=useState(false);


  const showCartHandler = () =>{
    setIsCartshown(true);
  };

  const HideCartHandler = () =>{
    setIsCartshown(false);
  };


  return (
    <CartProvider>
      {cartshown && <Cart onCloseCart={HideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
        <Drink />
        <Dessert/>
      </main>
    </CartProvider>
  );
}

export default App;
