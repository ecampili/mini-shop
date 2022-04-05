import { ICartProduct } from '../../interfaces';
import {CartState } from'./';

type CartActionType =
|{type:'[Cart]-LoadCart_from_cookies_storage',payload:ICartProduct[]}
|{type:'[Cart]-UpdateCart',payload:ICartProduct[]}
|{type:'[Cart]-ChangeProductQuantity',payload:ICartProduct}
|{type:'[Cart]-RemoveFromCart',payload:ICartProduct}
|{
  type:'[Cart]-UpdateOrderSummary',payload:{   
      numberOfItems: number;
      subTotal: number;
      tax: number;
      total: number;
      } 
  }

export const cartReducer =(state:CartState,action:CartActionType):CartState=>{
  switch(action.type){

    case '[Cart]-LoadCart_from_cookies_storage':
      return {
        ...state,   
        cart: action.payload     
      }

    case '[Cart]-UpdateCart':
      return {
        ...state, 
        cart:[...action.payload]       
      }
      
    case '[Cart]-ChangeProductQuantity':
      return{
        ...state,
        cart:state.cart.map(product =>{

          if(product._id !== action.payload._id) return product
          if(product.size !== action.payload.size) return product

          // product.quantity = action.payload.quantity
          // return product

          return action.payload            

        })
      }

    case '[Cart]-RemoveFromCart':{
      return{
        ...state,
        cart: state.cart.filter(product=>(product._id && product.size )!== (action.payload._id && action.payload.size))
      }
    }

    case '[Cart]-UpdateOrderSummary':{
      return {
        ...state,
        ...action.payload
      }
     
    }

    default: return state
  }
}