import { renderProjectDetail } from './render.js';
import { t, format } from './i18n.js';
import { openDialog } from './lightbox.js';

export function initProjects(data, lang, base, signal) {
  const cards = [...document.querySelectorAll('.project-card')];
  const status = document.querySelector('[data-project-status]');
  const dialog = document.getElementById('project-dialog');
  const dialogContent = dialog?.querySelector('[data-dialog-content]');

  function applyFilter(filter) {
    let shown = 0;
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.categories.split(' ').includes(filter);
      card.hidden = !match;
      if (match) {
        shown += 1;
        card.classList.add('is-visible');
      }
    });
    if (status) {
      status.textContent = format(t(data.ui.projects.showing, lang), { n: shown, total: cards.length });
    }
  }

  document.addEventListener(
    'click',
    (e) => {
      const filterBtn = e.target.closest('[data-filter]');
      if (filterBtn) {
        filterBtn.parentElement.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === filterBtn)));
        applyFilter(filterBtn.dataset.filter);
        return;
      }

      const detailBtn = e.target.closest('[data-project]');
      if (detailBtn && dialog && dialogContent) {
        const project = data.projects.find((p) => p.id === detailBtn.dataset.project);
        if (!project) return;
        dialogContent.innerHTML = renderProjectDetail(project, data, lang, base);
        openDialog(dialog, detailBtn);
        dialog.scrollTop = 0;
        dialog.querySelector('.dialog-close')?.focus();
      }
    },
    { signal },
  );
}
