import { createContext, useReducer, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  TOGLE_CART_POPUP: 'TOGLE_CART_POPUP',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
  isCartOpen:false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

const cartReducer = (state, action) => {
  const { type, cartItems, cartCount, cartTotal, isCartOpen } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGLE_CART_POPUP:
      return { ...state, isCartOpen: isCartOpen };
      case CART_ACTION_TYPES.SET_CART_ITEMS:
        return { ...state, cartItems: cartItems };
      case CART_ACTION_TYPES.SET_CART_COUNT:
      return { ...state, cartCount: cartCount };
      case CART_ACTION_TYPES.SET_CART_TOTAL:
      return { ...state, cartTotal: cartTotal };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};



export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = (isCartOpenAtt) =>
    dispatch({ type: CART_ACTION_TYPES.TOGLE_CART_POPUP, isCartOpen: isCartOpenAtt });

  const setCartItems = (cartItemsAtt) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, cartItems: cartItemsAtt });
  }

  const setCartCount = (cartCountAtt) =>
    dispatch({ type: CART_ACTION_TYPES.SET_CART_COUNT, cartCount: cartCountAtt });
    
  const setCartTotal = (cartTotalAtt) =>
    dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL, cartTotal: cartTotalAtt });
  
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
