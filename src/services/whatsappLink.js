import { formatMoney } from '../features/products/money.js';
import { STORE_NAME } from '../config/store.js';

export function normalizePeruvianPhone(phoneNumber) {
  const digits = String(phoneNumber || '').replace(/\D/g, '');
  if (/^9\d{8}$/.test(digits)) return `51${digits}`;
  if (/^519\d{8}$/.test(digits)) return digits;
  return null;
}

export function buildWhatsAppLink(phoneNumber, lines, storeName = STORE_NAME) {
  const phone = normalizePeruvianPhone(phoneNumber);
  if (!phone || !Array.isArray(lines) || lines.length === 0) return null;
  if (lines.some(({ product, quantity }) => !product?.name
    || !Number.isSafeInteger(product.priceCents)
    || product.priceCents <= 0
    || !Number.isSafeInteger(quantity)
    || quantity <= 0)) return null;

  const subtotalCents = lines.reduce((sum, line) => sum + line.product.priceCents * line.quantity, 0);
  const details = lines.map(({ product, quantity }) => {
    const lineSubtotal = product.priceCents * quantity;
    return `• ${product.name}\n  Cantidad: ${quantity}\n  Precio unitario: ${formatMoney(product.priceCents)}\n  Subtotal: ${formatMoney(lineSubtotal)}`;
  }).join('\n\n');
  const message = `¡Hola! Quisiera realizar un pedido en ${storeName}.\n\n${details}\n\nSubtotal del pedido: ${formatMoney(subtotalCents)}\nTotal: ${formatMoney(subtotalCents)}\n\n¿Podrían ayudarme a coordinar la entrega? Gracias.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
