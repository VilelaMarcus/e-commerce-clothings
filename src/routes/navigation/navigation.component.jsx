import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import './navigation.styles.scss';
import { ReactComponent as CrwLogo } from '../../assets/crown.svg'

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";


import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
 
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to='/'> 
          <CrwLogo className="logo"/>
        </Link>        
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link> 
          {currentUser ? 
          (
            <span className="nav-link" onClick={signOutUser}>
              SING OUT
            </span>
          ) : 
          (
            <Link className="nav-link" to="/sing-in">
              SING IN
            </Link>
          )}
          <CartIcon />
          
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
