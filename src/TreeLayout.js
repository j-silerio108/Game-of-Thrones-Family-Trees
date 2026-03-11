/**
 * Wraps the raw positions map and provides a clean query interface.
 * Separates layout concerns from rendering so positions can later be
 * generated algorithmically without touching other classes.
 */
export class TreeLayout {
  /** @param {Record<string, {x:number, y:number}>} positions */
  constructor(positions) {
    this._positions = positions;
  }

  /**
   * @param {string} id
   * @returns {{x:number, y:number}|null}
   */
  getPosition(id) {
    return this._positions[id] ?? null;
  }

  /** @param {string} id */
  has(id) {
    return id in this._positions;
  }
}
