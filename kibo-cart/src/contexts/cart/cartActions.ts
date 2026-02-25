import type { CartItem } from '../../types/cart';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const CLEAR_CART = 'CLEAR_CART';

export type CartAction =
  | { type: typeof ADD_ITEM; payload: CartItem }
  | { type: typeof REMOVE_ITEM; payload: { id: string } }
  | { type: typeof INCREMENT; payload: { id: string } }
  | { type: typeof DECREMENT; payload: { id: string } }
  | { type: typeof CLEAR_CART };


  // Action creators — clean, readable, reusable

export const addItem = (item: CartItem): CartAction => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (id: string): CartAction => ({
  type: REMOVE_ITEM,
  payload: { id },
});

export const incrementItem = (id: string): CartAction => ({
  type: INCREMENT,
  payload: { id },
});

export const decrementItem = (id: string): CartAction => ({
  type: DECREMENT,
  payload: { id },
});

export const clearCart = (): CartAction => ({
  type: CLEAR_CART,
});
