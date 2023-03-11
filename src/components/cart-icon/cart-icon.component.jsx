import { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/cart.context';


import './cart-icon.styles.scss';

const CartIcon = () => {
   const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);
   const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
   const numOfItens = cartItems.reduce((ammont, cartItem) => {return ammont + cartItem.quantity} ,0)

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{numOfItens}</span>
    </div>
  );
};

export default CartIcon;