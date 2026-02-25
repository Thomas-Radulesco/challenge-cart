import { describe, it, expect } from "vitest";
import type { CartItem, CartState } from "../types/cart";
import { cartReducer } from "../contexts/CartContext";


describe("cartReducer", () => {
  const initialState: CartState = { items: [] };

  const sampleItem: CartItem = {
    id: "1",
    title: "Test Product",
    price: 10,
    quantity: 1,
  };

  it("adds a new item", () => {
    const state = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: sampleItem,
    });

    expect(state.items.length).toBe(1);
    expect(state.items[0]).toEqual(sampleItem);
  });

  it("increments quantity when adding an existing item", () => {
    const state = cartReducer(
      { items: [sampleItem] },
      {
        type: "ADD_ITEM",
        payload: { ...sampleItem, quantity: 2 },
      }
    );

    expect(state.items[0].quantity).toBe(3);
  });

  it("removes an item", () => {
    const state = cartReducer(
      { items: [sampleItem] },
      { type: "REMOVE_ITEM", payload: { id: "1" } }
    );

    expect(state.items.length).toBe(0);
  });

  it("increments quantity", () => {
    const state = cartReducer(
      { items: [sampleItem] },
      { type: "INCREMENT", payload: { id: "1" } }
    );

    expect(state.items[0].quantity).toBe(2);
  });

  it("decrements quantity and removes item at zero", () => {
    const state = cartReducer(
      { items: [sampleItem] },
      { type: "DECREMENT", payload: { id: "1" } }
    );

    expect(state.items.length).toBe(0);
  });

  it("clears the cart", () => {
    const state = cartReducer(
      { items: [sampleItem] },
      { type: "CLEAR_CART" }
    );

    expect(state.items.length).toBe(0);
  });
});
