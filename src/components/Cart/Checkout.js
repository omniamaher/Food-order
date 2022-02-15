import classes from "./Checkout.module.css";
import useInput from "../hooks/use-input";
const Checkout = (props) => {
  //NAME
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");
  //STREET
  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetInputChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value.trim() !== "");

  //CITY
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityInputChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  //phone number
  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneInputChangedHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput,
  } = useInput((value) => value.trim().length === 11);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPhoneIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (
      !enteredNameIsValid &&
      !enteredStreetIsValid &&
      !enteredPhoneIsValid &&
      !enteredCityIsValid
    ) {
      return;
    }

    resetNameInput();
    resetStreetInput();
    resetPhoneInput();
    resetCityInput();
    
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        phone: enteredPhone,
      });

    //SUBMIT FORM DATA TO DATABASE
 


    console.log(enteredName, enteredStreet, enteredPhone, enteredCity);
  };





  //NAME STYLE ERROR
  const nameClasses = nameInputHasError ?
   ` ${classes.invalid} ` : `${classes.control}`;
  //STREET STYLE ERROR
  const streetClasses = streetInputHasError ?
   ` ${classes.invalid} ` : `${classes.control}`;
  //CITY STYLE ERROR
  const cityClasses = cityInputHasError ?
  ` ${classes.invalid} ` : `${classes.control}`;
  //PHONE NUMBER STYLE ERROR
  const phoneClasses = phoneInputHasError ?
  ` ${classes.invalid} ` : `${classes.control}`;



  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p style={{ color: "red" }}>please enter a valid name</p>
        )}
      </div>

      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetInputChangedHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
        {streetInputHasError && (
          <p style={{ color: "red" }}>please enter a valid street</p>
        )}
      </div>

      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangedHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {cityInputHasError && (
          <p style={{ color: "red" }}>please enter a valid City</p>
        )}
      </div>

      <div className={phoneClasses}>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          onChange={phoneInputChangedHandler}
          onBlur={phoneBlurHandler}
          value={enteredPhone}
        />
        {phoneInputHasError && (
          <p style={{ color: "red" }}>
            please enter a valid phone number (11 numbers long)
          </p>
        )}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
