/**
 * Pixel positions for each character node on the canvas.
 * Key: character id. Value: { x, y } top-left corner of the node.
 *
 * Grid reference:
 *   Row 0 (grandparents) : y = 60
 *   Row 1 (parents)      : y = 300  (+240)
 *   Row 2 (children)     : y = 540  (+240)
 *   Lower sections        : y = 780 / 1020
 *
 * To add a new character, drop a new entry here and add the character data
 * in characters.js — no other file needs to change.
 */
export const LAYOUT_DATA = {
  // ── STARKS ──────────────────────────────────────────────────────────────
  'rickard-stark':   { x: 160,  y: 60  },
  'lyarra-stark':    { x: 340,  y: 60  },
  'eddard-stark':    { x: 60,   y: 300 },
  'catelyn-stark':   { x: 260,  y: 300 },
  'benjen-stark':    { x: 480,  y: 300 },
  'lyanna-stark':    { x: 670,  y: 300 },
  'robb-stark':      { x: 0,    y: 540 },
  'talisa-stark':    { x: 160,  y: 540 },
  'sansa-stark':     { x: 340,  y: 540 },
  'arya-stark':      { x: 510,  y: 540 },
  'bran-stark':      { x: 670,  y: 540 },
  'rickon-stark':    { x: 840,  y: 540 },
  'jon-snow':        { x: 1030, y: 540 },
  'ygritte':         { x: 1200, y: 540 },

  // ── LANNISTERS ──────────────────────────────────────────────────────────
  'tywin-lannister':    { x: 1590, y: 60  },
  'joanna-lannister':   { x: 1770, y: 60  },
  'cersei-lannister':   { x: 1440, y: 300 },
  'jaime-lannister':    { x: 1650, y: 300 },
  'tyrion-lannister':   { x: 1860, y: 300 },
  'joffrey-baratheon':  { x: 1460, y: 540 },
  'myrcella-baratheon': { x: 1610, y: 540 },
  'tommen-baratheon':   { x: 1760, y: 540 },

  // ── TARGARYENS ──────────────────────────────────────────────────────────
  'aerys-targaryen':    { x: 2240, y: 60  },
  'rhaella-targaryen':  { x: 2420, y: 60  },
  'rhaegar-targaryen':  { x: 2060, y: 300 },
  'elia-martell':       { x: 2260, y: 300 },
  'viserys-targaryen':  { x: 2470, y: 300 },
  'daenerys-targaryen': { x: 2660, y: 300 },
  'khal-drogo':         { x: 2850, y: 300 },

  // ── BARATHEONS ──────────────────────────────────────────────────────────
  'renly-baratheon':    { x: 1120, y: 780 },
  'robert-baratheon':   { x: 1310, y: 780 },
  'stannis-baratheon':  { x: 1560, y: 780 },
  'selyse-baratheon':   { x: 1740, y: 780 },
  'gendry':             { x: 1380, y: 1020 },
  'shireen-baratheon':  { x: 1640, y: 1020 },

  // ── TYRELLS ─────────────────────────────────────────────────────────────
  'olenna-tyrell':   { x: 2120, y: 780 },
  'mace-tyrell':     { x: 2300, y: 780 },
  'loras-tyrell':    { x: 2180, y: 1020 },
  'margaery-tyrell': { x: 2380, y: 1020 },

  // ── GREYJOYS ────────────────────────────────────────────────────────────
  'balon-greyjoy':  { x: 2680, y: 780 },
  'euron-greyjoy':  { x: 2880, y: 780 },
  'theon-greyjoy':  { x: 2560, y: 1020 },
  'yara-greyjoy':   { x: 2740, y: 1020 },

  // ── TULLYS & ARRYNS ─────────────────────────────────────────────────────
  // Hoster is in the grandparent row so lines to his children go downward
  'hoster-tully':  { x: 490,  y: 60  },
  'lysa-arryn':    { x: 600,  y: 780 },
  'jon-arryn':     { x: 800,  y: 780 },
  'edmure-tully':  { x: 420,  y: 780 },
  'robin-arryn':   { x: 700,  y: 1020 },

  // ── MARTELLS ────────────────────────────────────────────────────────────
  'doran-martell':    { x: 3040, y: 300 },
  'oberyn-martell':   { x: 3220, y: 300 },
  'ellaria-sand':     { x: 3400, y: 300 },
  'trystane-martell': { x: 3040, y: 540 },
};
