import { CharacterRepository } from './CharacterRepository.js';
import { TreeLayout }          from './TreeLayout.js';
import { NodeRenderer }        from './NodeRenderer.js';
import { ConnectionRenderer }  from './ConnectionRenderer.js';
import { DetailPanel }         from './DetailPanel.js';
import { PanZoomController }   from './PanZoomController.js';
import { HouseFilter }         from './HouseFilter.js';
import { CHARACTER_DATA }      from './data/characters.js';
import { LAYOUT_DATA }         from './data/layout.js';

/**
 * Top-level orchestrator.
 * Wires all sub-components together and owns the selection state.
 * Nothing outside this class should hold references to more than one component.
 */
export class FamilyTree {
  constructor() {
    this._repository = new CharacterRepository(CHARACTER_DATA);
    this._layout     = new TreeLayout(LAYOUT_DATA);
    this._selectedId = null;

    const canvas    = document.getElementById('tree-canvas');
    const svgEl     = document.getElementById('connections');
    const container = document.getElementById('tree-container');
    const panelEl   = document.getElementById('detail-panel');

    this._panZoom     = new PanZoomController(container, canvas);
    this._nodes       = new NodeRenderer(canvas);
    this._connections = new ConnectionRenderer(svgEl);
    this._panel       = new DetailPanel(
      panelEl,
      this._repository,
      id => this._navigate(id),
    );
    this._filter = new HouseFilter(
      document.querySelectorAll('.filter-btn'),
      house => this._nodes.applyFilter(house),
    );
  }

  /** Renders the full tree. Call once after the DOM is ready. */
  init() {
    this._nodes.render(
      this._repository.getAll(),
      this._layout,
      id => this._onSelect(id),
    );
    this._connections.render(this._repository.getAll(), this._layout);
  }

  // ── Private ────────────────────────────────────────────────────────────

  _onSelect(id) {
    if (this._selectedId === id) {
      this._selectedId = null;
      this._nodes.deselect();
      this._panel.hide();
      return;
    }

    this._selectedId = id;
    this._nodes.setSelected(id);

    const character = this._repository.getById(id);
    if (character) this._panel.show(character);
  }

  /** Navigate to a character by id: select it and centre the viewport on it. */
  _navigate(id) {
    this._onSelect(id);
    const pos = this._layout.getPosition(id);
    if (pos) this._panZoom.centerOn(pos.x, pos.y);
  }
}
