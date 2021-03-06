import { Fragment } from "react";
import italianImage from "../../assets/italian1.jpeg";
import classes from './Header.module.css';
import HeaderCurtButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>βππΆππΎπΆπ β±πππΉ</h1>
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
