import { NODE_W } from './constants.js';

/**
 * Creates and manages the DOM card elements for each character.
 * Owns the node → element mapping so other classes never touch DOM directly.
 */
export class NodeRenderer {
  /** @param {HTMLElement} canvas - The absolutely-positioned tree canvas div */
  constructor(canvas) {
    this._canvas = canvas;
    /** @type {Map<string, HTMLElement>} */
    this._nodes  = new Map();
  }

  /**
   * Renders all character cards onto the canvas.
   * @param {import('./Character.js').Character[]} characters
   * @param {import('./TreeLayout.js').TreeLayout} layout
   * @param {(id: string) => void} onSelect - Callback when a card is clicked
   */
  render(characters, layout, onSelect) {
    this.clear();

    for (const ch of characters) {
      const pos = layout.getPosition(ch.id);
      if (!pos) continue;

      const el = this._buildCard(ch, pos, onSelect);
      this._canvas.appendChild(el);
      this._nodes.set(ch.id, el);
    }
  }

  /** Removes all card elements and clears the internal map. */
  clear() {
    this._nodes.forEach(el => el.remove());
    this._nodes.clear();
  }

  /**
   * Marks one card as selected and deselects all others.
   * @param {string|null} id
   */
  setSelected(id) {
    this._nodes.forEach((el, nid) => el.classList.toggle('selected', nid === id));
  }

  /** Removes the selected state from all cards. */
  deselect() {
    this._nodes.forEach(el => el.classList.remove('selected'));
  }

  /**
   * Dims every card that does not belong to the given house.
   * Pass 'all' to un-dim everything.
   * @param {string} house
   */
  applyFilter(house) {
    this._nodes.forEach((el, id) => {
      const match = house === 'all' || el.dataset.house === house;
      el.classList.toggle('dimmed', !match);
    });
  }

  // ── Private ────────────────────────────────────────────────────────────

  _buildCard(ch, pos, onSelect) {
    const el   = document.createElement('div');
    const col  = ch.color;

    el.className      = 'node';
    el.dataset.id     = ch.id;
    el.dataset.house  = ch.house;
    el.style.left     = `${pos.x}px`;
    el.style.top      = `${pos.y}px`;
    el.style.width    = `${NODE_W}px`;

    el.innerHTML = `
      <div class="node-card">
        <div class="node-header" style="background:${col}"></div>
        <div class="node-body">
          <div class="node-portrait" style="background:${col}22;border-color:${col}55;overflow:hidden;padding:0">
            <img src="assets/images/${ch.id}.jpg"
                 alt="${ch.name}"
                 style="width:100%;height:100%;object-fit:cover;object-position:top;border-radius:50%;display:block"
                 onerror="this.style.display='none'"
                 onload="this.nextElementSibling.style.display='none'">
            <span style="font-size:1.4rem;width:100%;height:100%;display:flex;align-items:center;justify-content:center">${ch.emoji}</span>
          </div>
          <div class="node-name">${ch.name}</div>
          <div class="node-title">${ch.title}</div>
          <span class="node-status status-${ch.status}">${ch.status.toUpperCase()}</span>
        </div>
      </div>`;

    el.addEventListener('click', () => onSelect(ch.id));
    return el;
  }
}
