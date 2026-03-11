import { NODE_W, NODE_H } from './constants.js';

const PARENT_COLOR  = '#6a6a6a';
const SPOUSE_COLOR  = '#c9a84c';
const STROKE_WIDTH  = 1.5;
const OPACITY       = 0.6;
const SPOUSE_DASH   = '5,4';

/**
 * Renders SVG bezier curves between related characters.
 * - Solid grey lines: parent → child
 * - Dashed gold lines: spouse ↔ spouse
 *
 * Each connection is drawn at most once (de-duplicated by a sorted key).
 */
export class ConnectionRenderer {
  /** @param {SVGElement} svgEl */
  constructor(svgEl) {
    this._svg = svgEl;
  }

  /**
   * Clears and redraws all connections.
   * @param {import('./Character.js').Character[]} characters
   * @param {import('./TreeLayout.js').TreeLayout} layout
   */
  render(characters, layout) {
    this.clear();
    const drawn = new Set();

    for (const ch of characters) {
      const pos = layout.getPosition(ch.id);
      if (!pos) continue;

      this._drawParentLines(ch, pos, layout, drawn);
      this._drawSpouseLines(ch, pos, layout, drawn);
    }
  }

  clear() {
    this._svg.innerHTML = '';
  }

  // ── Private ────────────────────────────────────────────────────────────

  _drawParentLines(ch, pos, layout, drawn) {
    for (const childId of ch.children) {
      const cpos = layout.getPosition(childId);
      if (!cpos) continue;

      const key = [ch.id, childId].sort().join('--');
      if (drawn.has(key)) continue;
      drawn.add(key);

      this._drawCurve(
        pos.x  + NODE_W / 2, pos.y  + NODE_H,
        cpos.x + NODE_W / 2, cpos.y,
        PARENT_COLOR, false,
      );
    }
  }

  _drawSpouseLines(ch, pos, layout, drawn) {
    for (const spouseId of ch.spouses) {
      const spos = layout.getPosition(spouseId);
      if (!spos) continue;

      const key = [ch.id, spouseId].sort().join('==');
      if (drawn.has(key)) continue;
      drawn.add(key);

      this._drawCurve(
        pos.x  + NODE_W / 2, pos.y  + NODE_H / 2,
        spos.x + NODE_W / 2, spos.y + NODE_H / 2,
        SPOUSE_COLOR, true,
      );
    }
  }

  _drawCurve(x1, y1, x2, y2, color, dashed) {
    const midY  = (y1 + y2) / 2;
    const path  = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    path.setAttribute('d',            `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`);
    path.setAttribute('stroke',       color);
    path.setAttribute('stroke-width', String(STROKE_WIDTH));
    path.setAttribute('fill',         'none');
    path.setAttribute('opacity',      String(OPACITY));

    if (dashed) path.setAttribute('stroke-dasharray', SPOUSE_DASH);

    this._svg.appendChild(path);
  }
}
