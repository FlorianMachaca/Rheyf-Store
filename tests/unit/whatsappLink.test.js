import { describe, expect, it } from 'vitest';
import { buildWhatsAppLink } from '../../src/services/whatsappLink.js';

describe('WhatsApp order link', () => {
  it('encodes the Peruvian order message and does not send it automatically', () => {
    const link = buildWhatsAppLink('+51 999 888 777', [
      { product: { name: 'Mochila urbana', priceCents: 7990 }, quantity: 2 },
    ], 15980);
    const url = new URL(link);
    expect(url.hostname).toBe('wa.me');
    expect(url.pathname).toBe('/51999888777');
    expect(decodeURIComponent(url.searchParams.get('text'))).toContain('Mochila urbana x2');
    expect(decodeURIComponent(url.searchParams.get('text'))).toContain('Total: S/ 159.80');
  });
  it('rejects missing recipient or invalid cart', () => {
    expect(buildWhatsAppLink('', [{ product: {}, quantity: 1 }], 100)).toBeNull();
    expect(buildWhatsAppLink('51999888777', [], 0)).toBeNull();
  });
});
