
const main = () => {
  const myTree = new BinarySearchTree();
  createSampleTreeData(myTree);
  console.log('treeData', myTree);
  var ui = new BinarySearchTreeUI(myTree);
  ui.init();
};

document.addEventListener("DOMContentLoaded", function() {
  main();
});