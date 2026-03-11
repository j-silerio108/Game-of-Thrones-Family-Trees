/**
 * Manages the house filter buttons in the header.
 * Fires onFilter(house) whenever the active house changes.
 * 'all' means no filter is applied.
 */
export class HouseFilter {
  /**
   * @param {NodeListOf<HTMLElement>} buttons
   * @param {(house: string) => void} onFilter
   */
  constructor(buttons, onFilter) {
    this._buttons  = buttons;
    this._onFilter = onFilter;
    this._active   = 'all';

    this._bindEvents();
  }

  /** @returns {string} The currently active house name, or 'all'. */
  get active() {
    return this._active;
  }

  // ── Private ────────────────────────────────────────────────────────────

  _bindEvents() {
    this._buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        this._buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._active = btn.dataset.house;
        this._onFilter(this._active);
      });
    });
  }
}
