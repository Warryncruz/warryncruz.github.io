let lastOpener = null;

export function openDialog(dialog, opener) {
  if (!dialog) return;
  lastOpener = opener || document.activeElement;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
}

export function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
}

function initDialogBasics(signal) {
  document.addEventListener(
    'click',
    (e) => {
      const closeBtn = e.target.closest('[data-action="close-dialog"]');
      if (closeBtn) closeDialog(closeBtn.closest('dialog'));
      if (e.target instanceof HTMLDialogElement) closeDialog(e.target);
    },
    { signal },
  );
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener(
      'close',
      () => {
        if (lastOpener && document.contains(lastOpener)) lastOpener.focus();
        lastOpener = null;
      },
      { signal },
    );
  });
}

export function initLightbox(signal) {
  initDialogBasics(signal);

  const box = document.getElementById('lightbox');
  if (!box) return;
  const img = box.querySelector('[data-lightbox-img]');
  const caption = box.querySelector('[data-lightbox-caption]');
  let gallery = [];
  let index = 0;

  function show(i) {
    index = (i + gallery.length) % gallery.length;
    const item = gallery[index];
    img.src = item.dataset.lightbox;
    img.alt = item.dataset.caption || '';
    caption.textContent = item.dataset.caption || '';
    box.toggleAttribute('data-single', gallery.length < 2);
  }

  document.addEventListener(
    'click',
    (e) => {
      const trigger = e.target.closest('[data-lightbox]');
      if (trigger) {
        const scope = trigger.closest('ul') || document;
        gallery = [...scope.querySelectorAll('[data-lightbox]')];
        show(gallery.indexOf(trigger));
        openDialog(box, trigger);
        return;
      }
      if (e.target.closest('[data-action="lightbox-prev"]')) show(index - 1);
      if (e.target.closest('[data-action="lightbox-next"]')) show(index + 1);
    },
    { signal },
  );

  box.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    },
    { signal },
  );
}
