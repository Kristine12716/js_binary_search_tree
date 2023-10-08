const defaultBSTUIConfig = {
  HIGHLIGHT_CLASS: 'node__element--highlight',
  HIGHLIGHT_TIME: 300,
};

class BinarySearchTreeUI {
  highlightTimer = null;
  actionsContainerSelector;
  constructor(
    tree,
    render,
    treeContainerSelector = '.tree',
    actionsContainerSelector = '.bst-actions-container',
    config = {
      HIGHLIGHT_CLASS: 'node__element--highlight',
      HIGHLIGHT_TIME: 300,
    }
  ) {
    this.treeContainerSelector = treeContainerSelector;
    this.actionsContainerSelector = actionsContainerSelector;
    this.config = config;
    this.tree = tree;
    this.render = render || this.renderTree;
    const root = document.documentElement;
    root.style.setProperty(
      '--animation-timing',
      `${this.config.HIGHLIGHT_TIME / 1000}s`
    );
  }

  template() {
    return `
    <div class="btn-group">
      <button id="insertBtn" class="btn btn-warning">
        Insert Node
      </button>
      <button id="removeElementBtn" class="btn btn-dark">
        Remove Node
      </button>
    </div>
    <div class="btn-group">
      <button id="searchBtn" class="btn btn-primary">Search</button>
    </div>
    </div>
    `;
  }

  traverseUINodes(nodes) {
    nodes.reduce((pr, node) => {
      return pr.then(() => this.highlightNode(node));
    }, Promise.resolve());
  }

  getTreeUI(node) {
    const { left, right, value } = node;
    if (!node) {
      return '';
    }
    return `
      <div class="node__element" data-node-id="${value}">${value}</div>
      ${
        left || right
          ? `
            <div class="node__bottom-line"></div>
            <div class="node__children">
            <div class="node node--left">
              ${left ? this.getTreeUI(left) : ''}
            </div>
            <div class="node node--right">
              ${right ? this.getTreeUI(right) : ''}
            </div>
            </div>
          `
          : ''
      }
    `;
  }

  renderTree(
    node = this.tree.root,
    containerSelector = this.treeContainerSelector
  ) {
    const treeContainer = document.querySelector(containerSelector);
    if (!node) {
      return (treeContainer.innerHTML = '');
    }
    const template = this.getTreeUI(node);
    treeContainer.innerHTML = template;
  }

  highlightNode({ value }) {
    const nodeElement = document.querySelector(`[data-node-id="${value}"]`);
    if (this.highlightTimer !== null) {
      clearTimeout(this.highlightTimer);
      nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
      this.highlightTimer = null;
      return;
    }
    nodeElement.classList.add(this.config.HIGHLIGHT_CLASS);
    document.querySelectorAll('button').forEach((btn) => {
      btn.setAttribute('disabled', true);
    });
    return new Promise((resolve) => {
      this.highlightTimer = setTimeout(() => {
        nodeElement.classList.remove(this.config.HIGHLIGHT_CLASS);
        document.querySelectorAll('button').forEach((btn) => {
          btn.removeAttribute('disabled');
        });
        this.highlightTimer = null;
        resolve();
      }, this.config.HIGHLIGHT_TIME);
    });
  }

  onRemoveElementBtnClick() {
    const element = prompt('Enter element to remove from the tree');
    const removedEl = this.tree.remove(element);
    if (removedEl) {
      this.highlightNode(removedEl).then(() => {
        this.render(this.tree.root);
      });
    } else {
      alert('Element not found');
    }
  }

  setTemplate() {
    const actionsContainer = document.querySelector(
      this.actionsContainerSelector
    );
    actionsContainer.innerHTML = this.template();
  }

  onInsertBtnClick() {
    const element = prompt('Enter element to add to tree');
    if (!element) {
      return;
    }
    const node = this.tree.insert(element);
    this.render(this.tree.root);
    this.highlightNode(node);
  }

  onMinValueBtnClick() {
    const node = this.tree.min();
    if (node) {
      this.highlightNode(node);
    } else {
      alert('Node not found');
    }
  }

  onSearchBtnClick() {
    const searchVal = prompt('Enter the node value to search in the tree');
    const searchedNode = this.tree.search(searchVal);
    if (searchedNode) {
      this.highlightNode(searchedNode);
    } else {
      alert('Node not found');
    }
  }

  init() {
    this.setTemplate();
    const insert = document.querySelector('#insertBtn');
    const removeElementBtn = document.querySelector('#removeElementBtn');
    const searchBtn = document.querySelector('#searchBtn');

    removeElementBtn.addEventListener(
      'click',
      this.onRemoveElementBtnClick.bind(this)
    );
    insert.addEventListener('click', this.onInsertBtnClick.bind(this));
    minValueBtn.addEventListener('click', this.onMinValueBtnClick.bind(this));
    searchBtn.addEventListener('click', this.onSearchBtnClick.bind(this));
    maxValueBtn.addEventListener('click', this.onMaxValueBtnClick.bind(this));
    preOrderTravBtn.addEventListener(
      'click',
      this.onPreOrderTravBtnClick.bind(this)
    );
    inOrderTravBtn.addEventListener(
      'click',
      this.onInOrderTravBtnClick.bind(this)
    );
    postOrderTravBtn.addEventListener(
      'click',
      this.onPostOrderTravBtnClick.bind(this)
    );
    resetBtn.addEventListener('click', this.onResetBtnClick.bind(this));
  }
}
