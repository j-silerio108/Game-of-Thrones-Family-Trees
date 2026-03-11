import { NODE_W, NODE_H } from './constants.js';

const SCALE_MIN  = 0.2;
const SCALE_MAX  = 2.0;
const ZOOM_STEP  = 1.2;
const WHEEL_STEP = 1.1;

/**
 * Handles pan (click-drag) and zoom (scroll / buttons) on the tree canvas.
 * Entirely self-contained — attaches its own event listeners on construction.
 */
export class PanZoomController {
  /**
   * @param {HTMLElement} container - The overflow-hidden wrapper
   * @param {HTMLElement} canvas    - The absolutely-positioned inner canvas
   */
  constructor(container, canvas) {
    this._container = container;
    this._canvas    = canvas;
    this._scale     = 0.75;
    this._panX      = 40;
    this._panY      = 40;
    this._dragging  = false;

    this._applyTransform();
    this._bindEvents();
  }

  zoomIn() {
    this._scale = Math.min(SCALE_MAX, this._scale * ZOOM_STEP);
    this._applyTransform();
  }

  zoomOut() {
    this._scale = Math.max(SCALE_MIN, this._scale / ZOOM_STEP);
    this._applyTransform();
  }

  reset() {
    this._scale = 0.75;
    this._panX  = 40;
    this._panY  = 40;
    this._applyTransform();
  }

  /**
   * Smoothly centres the viewport on a canvas position.
   * @param {number} x
   * @param {number} y
   */
  centerOn(x, y) {
    const { width, height } = this._container.getBoundingClientRect();
    this._panX = width  / 2 - (x + NODE_W / 2) * this._scale;
    this._panY = height / 2 - (y + NODE_H / 2) * this._scale;
    this._applyTransform();
  }

  // ── Private ────────────────────────────────────────────────────────────

  _applyTransform() {
    this._canvas.style.transform =
      `translate(${this._panX}px, ${this._panY}px) scale(${this._scale})`;
  }

  _bindEvents() {
    let dragStartX, dragStartY, panStartX, panStartY;

    // ── Mouse events ───────────────────────────────────────────────────────
    this._container.addEventListener('mousedown', e => {
      if (e.target.closest('.node')) return;
      this._dragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      panStartX  = this._panX;
      panStartY  = this._panY;
      this._container.classList.add('dragging');
    });

    window.addEventListener('mousemove', e => {
      if (!this._dragging) return;
      this._panX = panStartX + (e.clientX - dragStartX);
      this._panY = panStartY + (e.clientY - dragStartY);
      this._applyTransform();
    });

    window.addEventListener('mouseup', () => {
      this._dragging = false;
      this._container.classList.remove('dragging');
    });

    this._container.addEventListener('wheel', e => {
      e.preventDefault();
      const factor   = e.deltaY < 0 ? WHEEL_STEP : 1 / WHEEL_STEP;
      const newScale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, this._scale * factor));
      const rect     = this._container.getBoundingClientRect();
      const mx       = e.clientX - rect.left;
      const my       = e.clientY - rect.top;

      this._panX  = mx - (mx - this._panX) * (newScale / this._scale);
      this._panY  = my - (my - this._panY) * (newScale / this._scale);
      this._scale = newScale;
      this._applyTransform();
    }, { passive: false });

    // ── Touch events (iPhone / iPad) ───────────────────────────────────────
    let lastTouchDist = null;

    this._container.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        if (e.target.closest('.node')) return;
        this._dragging = true;
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
        panStartX  = this._panX;
        panStartY  = this._panY;
      } else if (e.touches.length === 2) {
        this._dragging = false;
        lastTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    this._container.addEventListener('touchmove', e => {
      e.preventDefault();
      if (e.touches.length === 1 && this._dragging) {
        this._panX = panStartX + (e.touches[0].clientX - dragStartX);
        this._panY = panStartY + (e.touches[0].clientY - dragStartY);
        this._applyTransform();
      } else if (e.touches.length === 2 && lastTouchDist !== null) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor   = dist / lastTouchDist;
        const newScale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, this._scale * factor));
        const rect     = this._container.getBoundingClientRect();
        const mx       = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
        const my       = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

        this._panX  = mx - (mx - this._panX) * (newScale / this._scale);
        this._panY  = my - (my - this._panY) * (newScale / this._scale);
        this._scale = newScale;
        lastTouchDist = dist;
        this._applyTransform();
      }
    }, { passive: false });

    this._container.addEventListener('touchend', () => {
      this._dragging = false;
      lastTouchDist  = null;
    }, { passive: true });

    document.getElementById('zoom-in').addEventListener('click',    () => this.zoomIn());
    document.getElementById('zoom-out').addEventListener('click',   () => this.zoomOut());
    document.getElementById('zoom-reset').addEventListener('click', () => this.reset());
  }
}
