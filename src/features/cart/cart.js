export function addToCart(cart, product) {
  if (!product?.available) return cart;
  const existing = cart.find((line) => line.productId === product.id);
  return existing
    ? cart.map((line) => line.productId === product.id ? { ...line, quantity: line.quantity + 1 } : line)
    : [...cart, { productId: product.id, quantity: 1 }];
}

export function changeQuantity(cart, productId, delta) {
  return cart.map((line) => line.productId === productId
    ? { ...line, quantity: Math.max(1, Math.floor(line.quantity + delta)) }
    : line);
}

export function removeFromCart(cart, productId) {
  return cart.filter((line) => line.productId !== productId);
}

export function getCartSummary(cart, products) {
  const lines = cart.map((entry) => {
    const product = products.find((item) => item.id === entry.productId);
    return { product, productId: entry.productId, quantity: entry.quantity, valid: Boolean(product?.available),
      lineTotalCents: product ? product.priceCents * entry.quantity : 0 };
  });
  const totalCents = lines.reduce((sum, line) => sum + line.lineTotalCents, 0);
  return { lines, itemCount: lines.reduce((sum, line) => sum + line.quantity, 0), totalCents,
    valid: lines.length > 0 && lines.every((line) => line.valid) };
}
