import '@styles/globals.css';
import '@styles/tree.css';
import './modules/js_binary_search_tree.css';
import BinarySearchTree from './modules/js_binary_search_tree.js';
import BinarySearchTreeUI from './modules/bst-ui.js';
import createSampleTreeData from './modules/create-sample-tree-data.js';



const main = () => {
  const myTree = new BinarySearchTree();
  createSampleTreeData(myTree);
  console.log('treeData', myTree);
  const bstUI = new BinarySearchTreeUI(myTree, null, '.tree');
  bstUI.init();
  bstUI.render();
};

main();