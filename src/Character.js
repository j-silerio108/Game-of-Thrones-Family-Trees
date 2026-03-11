import { HOUSE_COLORS } from './constants.js';

/**
 * Immutable model representing a single character.
 * Wrap raw data objects from characters.js with this class to gain
 * computed properties without mutating the source data.
 */
export class Character {
  /** @param {object} data - Raw entry from CHARACTER_DATA */
  constructor(data) {
    this.id       = data.id;
    this.name     = data.name;
    this.house    = data.house;
    this.emoji    = data.emoji;
    this.title    = data.title   || '';
    this.status   = data.status  || 'unknown';
    this.bio      = data.bio     || '';
    this.quote    = data.quote   || '';
    this.knownFor = data.knownFor || [];
    this.spouses  = data.spouses  || [];
    this.children = data.children || [];

    Object.freeze(this);
  }

  /** House accent colour used for card headers and detail panel. */
  get color() {
    return HOUSE_COLORS[this.house] ?? HOUSE_COLORS.None;
  }

  /** Human-readable house label shown in the detail panel. */
  get houseLabel() {
    return this.house !== 'None' ? `House ${this.house}` : (this.title || '');
  }
}
