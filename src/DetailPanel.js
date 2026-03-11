/**
 * Manages the right-hand character detail panel.
 * Receives a Character and a CharacterRepository and builds the HTML internally.
 * Fires onNavigate(id) when a relation link is clicked.
 */
export class DetailPanel {
  /**
   * @param {HTMLElement} panelEl
   * @param {import('./CharacterRepository.js').CharacterRepository} repository
   * @param {(id: string) => void} onNavigate
   */
  constructor(panelEl, repository, onNavigate) {
    this._panel      = panelEl;
    this._repository = repository;
    this._onNavigate = onNavigate;

    document.getElementById('panel-close')
      .addEventListener('click', () => this.hide());
  }

  /** @param {import('./Character.js').Character} character */
  show(character) {
    const col = character.color;

    document.getElementById('detail-banner').style.background   = col;
    const portrait = document.getElementById('detail-portrait');
    portrait.style.background  = `${col}22`;
    portrait.style.borderColor = col;
    portrait.style.overflow    = 'hidden';
    portrait.style.padding     = '0';
    portrait.innerHTML = `
      <img src="assets/images/${character.id}.jpg"
           alt="${character.name}"
           style="width:100%;height:100%;object-fit:cover;object-position:top;border-radius:50%;display:block"
           onerror="this.style.display='none'"
           onload="this.nextElementSibling.style.display='none'">
      <span style="font-size:2.5rem;width:100%;height:100%;display:flex;align-items:center;justify-content:center">${character.emoji}</span>`;
    document.getElementById('detail-name').textContent          = character.name;
    document.getElementById('detail-house-name').textContent    = character.houseLabel;
    document.getElementById('detail-status').innerHTML =
      `<span class="node-status status-${character.status}">${character.status.toUpperCase()}</span>`;

    document.getElementById('detail-body').innerHTML = this._buildBodyHTML(character);
    this._attachRelationLinks();
    this._panel.classList.remove('hidden');
  }

  hide() {
    this._panel.classList.add('hidden');
  }

  // ── Private ────────────────────────────────────────────────────────────

  _buildBodyHTML(ch) {
    let html = '';

    if (ch.bio) {
      html += `<div class="detail-section"><h3>Biography</h3><p>${ch.bio}</p></div>`;
    }

    if (ch.knownFor.length) {
      html += `<div class="detail-section"><h3>Known For</h3><ul>`;
      ch.knownFor.forEach(k => { html += `<li>${k}</li>`; });
      html += `</ul></div>`;
    }

    if (ch.quote) {
      html += `<div class="detail-section"><h3>Notable Quote</h3><p class="quote">${ch.quote}</p></div>`;
    }

    const relations = this._repository.getRelations(ch);
    if (relations.length) {
      html += `<div class="detail-section"><h3>Relations</h3><ul>`;
      relations.forEach(({ label, character: r }) => {
        html += `<li>
          <span class="relation-link" data-id="${r.id}">${r.name}</span>
          <span style="color:var(--text-dim);font-size:0.7rem"> (${label})</span>
        </li>`;
      });
      html += `</ul></div>`;
    }

    return html;
  }

  _attachRelationLinks() {
    document.querySelectorAll('.relation-link').forEach(link => {
      link.addEventListener('click', () => this._onNavigate(link.dataset.id));
    });
  }
}
