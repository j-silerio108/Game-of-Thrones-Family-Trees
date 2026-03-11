import { FamilyTree } from './src/FamilyTree.js';

// ES modules are deferred by default, but DOMContentLoaded is explicit insurance.
document.addEventListener('DOMContentLoaded', () => {
  const tree = new FamilyTree();
  tree.init();
});
