import { Character } from './Character.js';

/**
 * Central data store. Constructs Character instances from raw data and
 * exposes query methods. All other classes receive data through this one.
 */
export class CharacterRepository {
  /** @param {object[]} rawData - Array of plain objects from CHARACTER_DATA */
  constructor(rawData) {
    this._characters = rawData.map(d => new Character(d));
    this._index = new Map(this._characters.map(c => [c.id, c]));
  }

  /** @returns {Character[]} All characters. */
  getAll() {
    return this._characters;
  }

  /**
   * @param {string} id
   * @returns {Character|undefined}
   */
  getById(id) {
    return this._index.get(id);
  }

  /**
   * @param {string} house - House name, e.g. 'Stark'
   * @returns {Character[]}
   */
  getByHouse(house) {
    return this._characters.filter(c => c.house === house);
  }

  /**
   * Returns every character who lists `id` in their children array.
   * @param {string} id
   * @returns {Character[]}
   */
  getParentsOf(id) {
    return this._characters.filter(c => c.children.includes(id));
  }

  /**
   * Builds a flat list of labelled relations (spouses, children, parents)
   * for use in the detail panel.
   * @param {Character} character
   * @returns {{ label: string, character: Character }[]}
   */
  getRelations(character) {
    const relations = [];

    for (const sid of character.spouses) {
      const s = this._index.get(sid);
      if (s) relations.push({ label: 'Spouse', character: s });
    }

    for (const cid of character.children) {
      const c = this._index.get(cid);
      if (c) relations.push({ label: 'Child', character: c });
    }

    for (const p of this.getParentsOf(character.id)) {
      relations.push({ label: 'Parent', character: p });
    }

    return relations;
  }
}
