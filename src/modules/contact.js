const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns true when the field is valid, and shows/hides its error. */
function validateField(field) {
  const error = field.form.querySelector(`[data-error-for="${field.name}"]`);
  const value = field.value.trim();
  let ok = value.length > 0;
  if (field.name === 'email') ok = EMAIL_RE.test(value);
  if (field.name === 'message') ok = value.length >= 10;

  field.setAttribute('aria-invalid', String(!ok));
  if (error) error.textContent = ok ? '' : error.dataset.message;
  return ok;
}

function initForm(site, signal) {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('[type="submit"]');
  const fields = [...form.querySelectorAll('input[required], textarea[required]')];
  let attempted = false;

  function setStatus(message, kind) {
    status.textContent = message;
    status.dataset.kind = kind; 
  }

  // After the first submit attempt, re-check fields as the visitor types.
  fields.forEach((field) => {
    field.addEventListener('input', () => attempted && validateField(field), { signal });
    field.addEventListener('blur', () => attempted && validateField(field), { signal });
  });

  form.addEventListener(
    'submit',
    async (e) => {
      e.preventDefault();
      attempted = true;
      const invalid = fields.filter((f) => !validateField(f));
      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      if (!site.formspreeId) {
        setStatus(status.dataset.notConfigured, 'error');
        return;
      }

      if (form.elements._gotcha?.value) {
        form.reset();
        setStatus(status.dataset.sent, 'success');
        return;
      }

      submit.disabled = true;
      submit.textContent = submit.dataset.sending;
      setStatus('', '');
      try {
        const response = await fetch(`https://formspree.io/f/${encodeURIComponent(site.formspreeId)}`, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
        form.reset();
        attempted = false;
        fields.forEach((f) => f.removeAttribute('aria-invalid'));
        setStatus(status.dataset.sent, 'success');
      } catch (err) {
        console.warn(err);
        setStatus(status.dataset.failed, 'error');
      } finally {
        submit.disabled = false;
        submit.textContent = submit.dataset.label;
      }
    },
    { signal },
  );
}

function initCopyEmail(ui, lang, t, signal) {
  document.addEventListener(
    'click',
    async (e) => {
      const btn = e.target.closest('[data-action="copy-email"]');
      if (!btn) return;
      const live = btn.parentElement.querySelector('.copy-status');
      try {
        await navigator.clipboard.writeText(btn.dataset.email);
        btn.classList.add('is-copied');
        if (live) live.textContent = t(ui.contact.copied, lang);
        window.setTimeout(() => {
          btn.classList.remove('is-copied');
          if (live) live.textContent = '';
        }, 2000);
      } catch {
        if (live) live.textContent = t(ui.contact.copyFailed, lang);
      }
    },
    { signal },
  );
}

export function initContact(data, lang, t, signal) {
  initForm(data.site, signal);
  initCopyEmail(data.ui, lang, t, signal);
}
