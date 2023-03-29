import { Outlet } from "react-router";
import { Fragment, useContext } from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import {signOutUser} from  '../../utils/firebase/firebase.utils'
import "./navigation.style.scss";

const Navigation = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>SIGN OUT
              </span>) : ( <Link className="nav-link" to="/auth">
              Sign In
            </Link>
            )}
            <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
