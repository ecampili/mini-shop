import { FC, useEffect, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';
import Cookie from 'js-cookie'


export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const Cart_INITIAL_STATE: CartState = {
  cart:[],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0
};

export const CartProvider: FC = ({ children }) => {
  
  const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE);

   // Efecto
 useEffect(() => {
 
 try {
  const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
  dispatch({ type:  '[Cart]-LoadCart_from_cookies_storage', payload: cookieProducts });
 } catch (error) {
  dispatch({ type:  '[Cart]-LoadCart_from_cookies_storage', payload: [] });
 }

}, []);

  useEffect(() => {
    Cookie.set('cart', JSON.stringify( state.cart ));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev,current)=> current.quantity+prev,0)
    const subTotal = state.cart.reduce((prev,current)=>(current.quantity*current.price)+prev,0)
    const taxRate= Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    console.log(taxRate)

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax:subTotal * taxRate,
      total: subTotal *(1+taxRate),
    }

    console.log('orderSummary',orderSummary)
    dispatch({type:'[Cart]-UpdateOrderSummary',payload:orderSummary})
    
 
  }, [state.cart]);


  

  const addProductToCart =(product:ICartProduct)=>{
   
    //final
    const productInCart = state.cart.some(p=>p._id === product._id) 
    if(!productInCart) return dispatch({type:'[Cart]-UpdateCart',payload:[...state.cart,product]})

    const productInCartButDifferentSize = state.cart.some(p=>p._id === product._id && p.size === product.size)
    if(!productInCartButDifferentSize)  return dispatch({type:'[Cart]-UpdateCart',payload:[...state.cart,product]})
  
    // Acumular
    const updatedProducts = state.cart.map(p=>{
      if(p._id !== product._id) return p;
      if(p.size !== product.size) return p;

      p.quantity +=product.quantity
      return p
    
    });

   dispatch({type:'[Cart]-UpdateCart',payload: updatedProducts})
   

  }

  const updateCartQuantity = (product:ICartProduct)=>{
    dispatch({type:'[Cart]-ChangeProductQuantity',payload:product})
  }

  const removeProductFromCart =(product:ICartProduct)=>{
    dispatch({type:'[Cart]-RemoveFromCart',payload:product})
  }

  
  return (
    <CartContext.Provider
      value={{
        ...state,

        //methods
        addProductToCart,
        updateCartQuantity,
        removeProductFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};