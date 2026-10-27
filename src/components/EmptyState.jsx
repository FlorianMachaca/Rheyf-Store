export default function EmptyState({ title, children, action, onAction }) {
  return (
    <section className="empty-state" role="status">
      <span className="empty-state-icon" aria-hidden="true">⌕</span>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action && <button className="button button-secondary" type="button" onClick={onAction}>{action}</button>}
    </section>
  );
}
