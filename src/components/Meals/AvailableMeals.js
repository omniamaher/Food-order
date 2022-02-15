import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://foodapp-a1da9-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("something went wring!!!");
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          //id = key they key will be the id of the indivdual meals
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
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    //in then this function is triggered when the request is done
    // once we get a response or we use async await


      //we try calling fetch meals but if inside thhat function an error
      //is thrown then we make it into the catch block
      fetchMeals().catch(error =>{
        setIsLoading(false);
        setHttpError(error.message);
      });

  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealseLoading}>
        <p>Loading.....</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      img={meal.imgsrc}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <h1>Main Dishes</h1>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
