import { formatMoney } from '../features/products/money.js';

export function buildWhatsAppLink(phoneNumber, lines, totalCents) {
  const phone = String(phoneNumber || '').replace(/\D/g, '');
  if (phone.length < 8 || !lines.length || lines.some((line) => !line.product)) return null;
  const details = lines.map(({ product, quantity }) =>
    `â€¢ ${product.name} x${quantity} â€” ${formatMoney(product.priceCents * quantity)}`).join('\n');
  const message = `Â¡Hola! Me gustarÃ­a realizar el siguiente pedido:\n\n${details}\n\nTotal: ${formatMoney(totalCents)}\n\nPor favor, confirma la disponibilidad y los detalles de envÃ­o. Â¡Gracias!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
