const HIGHLIGHT_CLASS = 'node__element--highlight';
const HIGHLIGHT_TIME = 300;
let highlightTimer = null;

const traverseUINodes = (nodes) => {
  nodes.reduce((pr, node) => {
    return pr.then(() => highlightNode(node));
  }, Promise.resolve());
};

const highlightNode = ({ value }) => {
  const nodeElement = document.querySelector(`[data-node-id="${value}"]`);
  if (highlightTimer !== null) {
    clearTimeout(highlightTimer);
    nodeElement.classList.remove(HIGHLIGHT_CLASS);
    highlightTimer = null;
    return;
  }
  console.log(nodeElement);
  nodeElement.classList.add(HIGHLIGHT_CLASS);
  document.querySelectorAll('button').forEach((btn) => {
    btn.setAttribute('disabled', true);
  });
  return new Promise((resolve) => {
    highlightTimer = setTimeout(() => {
      nodeElement.classList.remove(HIGHLIGHT_CLASS);
      document.querySelectorAll('button').forEach((btn) => {
        btn.removeAttribute('disabled');
      });
      highlightTimer = null;
      resolve();
    }, HIGHLIGHT_TIME);
  });
};

const initiateHandlers = (tree, render) => {
  const searchBtn = document.querySelector('#searchBtn');
  const insert = document.querySelector('#insertBtn');
  const removeElementBtn = document.querySelector('#removeElementBtn');
    removeElementBtn.addEventListener('click', () => {
    const element = prompt('Enter element to remove from the tree');
    const removedEl = tree.remove(element);
    if (removedEl) {
      highlightNode(removedEl).then(() => {
        render(tree.root);
      });
    } else {
      alert('Element not found');
    }
  });

  searchBtn.addEventListener('click', () => {
    const searchVal = prompt('Enter the node value to search in the tree');
    const searchedNode = tree.search(searchVal);
    if (searchedNode) {
      highlightNode(searchedNode);
    } else {
      alert('Node not found');
    }
  });

  insert.addEventListener('click', () => {
    const element = prompt('Enter element to add to tree');
    if (!element) {
      return;
    }
    const node = tree.insert(element);
    render(tree.root);
    highlightNode(node);
  });
};

const root = document.documentElement;
root.style.setProperty('--animation-timing', `${HIGHLIGHT_TIME / 1000}s`);

export default initiateHandlers;