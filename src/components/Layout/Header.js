import { Fragment } from "react";
import italianImage from "../../assets/italian1.jpeg";
import classes from './Header.module.css';
import HeaderCurtButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ℐ𝓉𝒶𝓁𝒾𝒶𝓃 ℱ𝑜𝑜𝒹</h1>
        <HeaderCurtButton onClick={props.onShowCart} />
      </header>
      {/* since its a css with a dash inside of it so we can't use dot notion */}
      <div className={classes['main-image']}>
        <img src={italianImage} alt='a table of italian food'/>
      </div>
    </Fragment>
  );
};
export default Header;
