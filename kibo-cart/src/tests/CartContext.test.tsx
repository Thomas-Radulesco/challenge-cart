import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "../contexts/CartContext";

describe("CartContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it("adds an item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: "1",
        title: "Test",
        price: 10,
        quantity: 1,
      });
    });

    expect(result.current.items.length).toBe(1);
  });

  it("increments quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: "1",
        title: "Test",
        price: 10,
        quantity: 1,
      });
      result.current.increment("1");
    });

    expect(result.current.items[0].quantity).toBe(2);
  });

  it("decrements quantity and removes item at zero", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: "1",
        title: "Test",
        price: 10,
        quantity: 1,
      });
      result.current.decrement("1");
    });

    expect(result.current.items.length).toBe(0);
  });

  it("clears the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: "1",
        title: "Test",
        price: 10,
        quantity: 1,
      });
      result.current.clearCart();
    });

    expect(result.current.items.length).toBe(0);
  });
});
