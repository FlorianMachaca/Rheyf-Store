import { describe, expect, it } from 'vitest';
import { buildWhatsAppLink, normalizePeruvianPhone } from '../../src/services/whatsappLink.js';
import { STORE_WHATSAPP_PHONE } from '../../src/config/store.js';

const lines = [
  { product: { name: 'Mochila urbana', priceCents: 7990 }, quantity: 2 },
  { product: { name: 'Camiseta básica', priceCents: 2990 }, quantity: 1 },
];

describe('WhatsApp order link', () => {
  it('normalizes the configured Peruvian number to international format', () => {
    expect(STORE_WHATSAPP_PHONE).toBe('930138447');
    expect(normalizePeruvianPhone('930138447')).toBe('51930138447');
    expect(normalizePeruvianPhone('+51 930 138 447')).toBe('51930138447');
    expect(normalizePeruvianPhone('51930138447')).toBe('51930138447');
  });

  it('includes store, product quantities, unit prices, subtotal, total, and delivery request', () => {
    const link = buildWhatsAppLink(STORE_WHATSAPP_PHONE, lines);
    const url = new URL(link);
    const message = url.searchParams.get('text');
    expect(url.origin + url.pathname).toBe('https://wa.me/51930138447');
    expect(message).toContain('Rheyf Store');
    expect(message).toContain('Mochila urbana');
    expect(message).toContain('Cantidad: 2');
    expect(message).toContain('Precio unitario: S/ 79.90');
    expect(message).toContain('Subtotal: S/ 159.80');
    expect(message).toContain('Subtotal del pedido: S/ 189.70');
    expect(message).toContain('Total: S/ 189.70');
    expect(message).toContain('coordinar la entrega');
  });

  it('rejects an invalid recipient, empty cart, or invalid line', () => {
    expect(buildWhatsAppLink('123', lines)).toBeNull();
    expect(buildWhatsAppLink('930138447', [])).toBeNull();
    expect(buildWhatsAppLink('930138447', [{ product: {}, quantity: 1 }])).toBeNull();
  });
});
