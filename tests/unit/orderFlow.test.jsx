import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import CartPage from '../../src/pages/CartPage.jsx';
import OrderConfirmationPage from '../../src/pages/OrderConfirmationPage.jsx';

const whatsappUrl = 'https://wa.me/51930138447?text=pedido';
const summary = {
  valid: true,
  itemCount: 1,
  totalCents: 7990,
  lines: [{ productId: 1, product: { id: 1, name: 'Mochila urbana', priceCents: 7990 }, quantity: 1, lineTotalCents: 7990, valid: true }],
};

describe('pedido desde carrito y confirmación', () => {
  it('abre el mismo enlace de WhatsApp desde Confirmar pedido', () => {
    const html = renderToStaticMarkup(<CartPage summary={summary} whatsappUrl={whatsappUrl} onChange={() => {}} onRemove={() => {}} onNavigate={() => {}} />);
    expect(html).toContain('Confirmar pedido por WhatsApp');
    expect(html).toMatch(/href="https:\/\/wa\.me\/51930138447\?text=/);
    expect(html).toContain('target="_blank"');
  });

  it('abre WhatsApp desde Pedir por WhatsApp en la confirmación', () => {
    const html = renderToStaticMarkup(<OrderConfirmationPage summary={summary} whatsappUrl={whatsappUrl} onNavigate={() => {}} />);
    expect(html).toContain('Pedir por WhatsApp');
    expect(html).toMatch(/href="https:\/\/wa\.me\/51930138447\?text=/);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('el mensaje solo se envía si lo confirmas allí');
  });

  it('bloquea el pedido vacío y muestra una indicación clara', () => {
    const emptySummary = { valid: false, itemCount: 0, totalCents: 0, lines: [] };
    const html = renderToStaticMarkup(<CartPage summary={emptySummary} whatsappUrl={whatsappUrl} onChange={() => {}} onRemove={() => {}} onNavigate={() => {}} />);
    expect(html).toContain('No puedes confirmar un pedido con el carrito vacío');
    expect(html).not.toContain('href="https://wa.me/');
  });
});
