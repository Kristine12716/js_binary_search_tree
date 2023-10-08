
const main = () => {
  const myTree = new BinarySearchTree();
  createSampleTreeData(myTree);
  console.log('treeData', myTree);
  initiateHandlers(myTree);
};

document.addEventListener("DOMContentLoaded", function() {
  main();
});