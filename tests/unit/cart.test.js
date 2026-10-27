import { describe, expect, it } from 'vitest';
import { addToCart, changeQuantity, removeFromCart, getCartSummary } from '../../src/features/cart/cart.js';

const products = [
  { id: 1, name: 'Mochila urbana', priceCents: 7990, available: true },
  { id: 2, name: 'Camiseta básica', priceCents: 2990, available: false },
];

describe('cart rules', () => {
  it('combines additions and calculates totals in cents', () => {
    const cart = addToCart(addToCart([], products[0]), products[0]);
    expect(cart[0].quantity).toBe(2);
    expect(getCartSummary(cart, products).totalCents).toBe(15980);
  });
  it('does not add unavailable products', () => {
    expect(addToCart([], products[1])).toEqual([]);
  });
  it('keeps quantity at one when decreased', () => {
    expect(changeQuantity([{ productId: 1, quantity: 1 }], 1, -1)[0].quantity).toBe(1);
  });
  it('removes selected lines and invalidates unavailable or deleted items', () => {
    const cart = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 1 }, { productId: 3, quantity: 1 }];
    const summary = getCartSummary(cart, products);
    expect(summary.lines.map((line) => line.valid)).toEqual([true, false, false]);
    expect(removeFromCart(cart, 2)).toHaveLength(2);
  });
});
