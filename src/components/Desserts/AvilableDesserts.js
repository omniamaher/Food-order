import classes from "./AvilableDesserts.module.css";
import Card from "../UI/Card";
import DessertItem from "./DessertItem/DessertItem";
import { useEffect, useState } from "react";

const AvilableDesserts = () => {

  const [desserts, setDesserts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchDesserts = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://foodapp-a1da9-default-rtdb.firebaseio.com/desserts.json"
      );
      if (!response.ok) {
        throw new Error("something went wring!!!");
      }
      const responseData = await response.json();

      const loadesDesserts = [];

      for (const key in responseData) {
        loadesDesserts.push({
          //id = key they key will be the id of the indivdual desserts
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
      setDesserts(loadesDesserts);
      setIsLoading(false);
    };
    //in then this function is triggered when the request is done
    // once we get a response or we use async await


      //we try calling fetch desserts but if inside thhat function an error
      //is thrown then we make it into the catch block
      fetchDesserts().catch(error =>{
        setIsLoading(false);
        setHttpError(error.message);
      });

  }, []);

  if (isLoading) {
    return (
      <section className={classes.DessertseLoading}>
        <p>Loading.....</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.DessertsError}>
        <p>{httpError}</p>
      </section>
    );
  }












  const dessertlist = desserts.map((dessert) => (
    <DessertItem
      id={dessert.id}
      key={dessert.id}
      name={dessert.name}
      description={dessert.description}
      price={dessert.price}
    />
  ));
  return (
    <section className={classes.desserts}>
      <Card>
        <h1>Desserts</h1>
        <ul>{dessertlist}</ul>
      </Card>
    </section>
  );
};

export default AvilableDesserts;
