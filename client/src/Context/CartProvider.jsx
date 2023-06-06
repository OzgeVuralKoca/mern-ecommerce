/* eslint-disable no-case-declarations */
import { createContext, useEffect, useReducer } from "react"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifySuccess = (message) => toast.success(message, {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});

export const CartContext = createContext();

const defaultCartState = {
  cartItems: [],
  totalAmount: 0,
  amount: 0,
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cartItems: action.payload
      };
    case 'ADD_TO_CART':
      const existingItemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
      console.log(existingItemIndex)
      if (existingItemIndex !== -1) {
        // Eğer ürün zaten sepete ekliyse sadece amount değerini güncelle
        const updatedCartItems = [...state.cartItems];
        const existingItem = updatedCartItems[existingItemIndex];
        return {
          ...state,
          cartItems: updatedCartItems,
          amount: state.amount + 1, 
          totalAmount: state.totalAmount + existingItem.price,
          
          
        };
      } else {
        // Yeni bir ürünse sepete ekle
        const newCartItem = {
          ...action.payload
        };
        return {
          ...state,
          cartItems: [...state.cartItems, newCartItem],
          totalAmount: state.totalAmount + action.payload.price,
          amount: 1,
        };
      }
    case 'REMOVE_FROM_CART':
      const removedItem = state.cartItems.find(item => item._id === action.payload);
      if (!removedItem) {
        return state; // Ürün bulunamadıysa mevcut durumu döndür
      }
      const removedItemAmount = removedItem.amount;
      const updatedCartItems = state.cartItems.filter(item => item._id !== action.payload);
      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: state.totalAmount - (removedItemAmount * removedItem.price)
      };
    default:
      return state;
  }
};

const CartProvider = ({ children, fetchData }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const fetchCartItems = async () => {
      try {
        let model = { userId: user._id };
        const response = await axios.post('http://localhost:5000/api/cart', model);
        dispatchCartAction({ type: 'SET_CART', payload: response.data });
      } catch (error) {
        console.log('Error fetching cart items:', error);
      }
    };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        productId: item._id,
        userId: user._id,
      });
      notifySuccess(response.data.message);
      dispatchCartAction({ type: 'ADD_TO_CART', payload: item });
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFromCart = (itemId) => {
    dispatchCartAction({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const cartContextValue = {
    cartItems: cartState.cartItems,
    totalAmount: cartState.totalAmount,
    amount: cartState.amount,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
