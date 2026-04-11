import { useEffect, useRef } from 'react';

export default function MessageModal({ title, lines = [], isError = false, onContinue }) {
  const modalRef   = useRef(null);
  const titleId    = 'modal-title';
  const descId     = 'modal-desc';

  /* Trampa de foco + cierre con Escape */
  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();

    function onKey(e) {
      if (e.key === 'Escape') { onContinue(); return; }
      if (e.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }

    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [onContinue]);

  return (
    <div className="modal-backdrop" aria-hidden="true">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="modal-window"
      >
        <h2
          id={titleId}
          className={`modal-title ${isError ? 'modal-title--error' : 'modal-title--info'}`}
        >
          {title}
        </h2>

        <div id={descId} className="modal-body">
          {lines.filter(Boolean).map((line, i) => (
            <p key={i} className="modal-line">{line}</p>
          ))}
        </div>

        <div className="modal-footer">
          <button
            className={`btn ${isError ? 'btn-danger' : 'btn-primary'}`}
            onClick={onContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
