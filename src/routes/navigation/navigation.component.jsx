import { Outlet } from "react-router";
import { Fragment, useContext } from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import {signOutUser} from  '../../utils/firebase/firebase.utils'


import {NavigationContainer, LogoContainer, NavLink, NavLinks} from "./navigation.style";

const Navigation = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>
  <LogoContainer to="/">
          <CrwnLogo className="logo"/>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            Shop
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT
              </NavLink>) : ( <NavLink to="/auth">
              Sign In
            </NavLink>
            )}
            <CartIcon />
        </NavLinks>
            {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
