import classes from "./AvilableDrinks.module.css";
import Card from "../UI/Card";
import DrinkItem from "./DrinkItem/DrinkItem";
import { useEffect, useState } from "react";

const AvailableDrinks = () => {


  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://foodapp-a1da9-default-rtdb.firebaseio.com/drinks.json"
      );
      if (!response.ok) {
        throw new Error("something went wring!!!");
      }
      const responseData = await response.json();

      const loadedDrinks = [];

      for (const key in responseData) {
        loadedDrinks.push({
          //id = key they key will be the id of the indivdual drinks
          //we are fetching
          id: key,
          //name can be pulled of responseData for the given key
          //with that we access the nested object in there where m1 is the
          //key and name,desc,price are the nested objects for tht given key
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setDrinks(loadedDrinks);
      setIsLoading(false);
    };
    //in then this function is triggered when the request is done
    // once we get a response or we use async await


      //we try calling fetch drinks but if inside thhat function an error
      //is thrown then we make it into the catch block
      fetchDrinks().catch(error =>{
        setIsLoading(false);
        setHttpError(error.message);
      });

  }, []);

  if (isLoading) {
    return (
      <section className={classes.DrinkseLoading}>
        <p>Loading.....</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.DrinksError}>
        <p>{httpError}</p>
      </section>
    );
  }













  const drinkList = drinks.map((drink) => (
    <DrinkItem
      id={drink.id}
      key={drink.id}
      name={drink.name}
      description={drink.description}
      price={drink.price}
    />
  ));
  return (
    <section className={classes.drinks}>
      <Card>
        <h1>Drinks</h1>
        <ul>{drinkList}</ul>
      </Card>
    </section>
  );
};

export default AvailableDrinks;
