(function () {
  enum removedSideEnum {
    root = "root",
    left = "left",
    right = "right",
  }

  class TreeNode {
    public value: any;
    public left: TreeNode | null;
    public right: TreeNode | null;

    constructor(val) {
      this.value = val;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {
    private root: TreeNode | null;
    constructor() {
      this.root = null;
    }

    public getRootNode(): TreeNode | null {
      return this.root;
    }

    public insert<T>(value: T): TreeNode | null {
      const newTreNode = new TreeNode(value);
      if (!this.root) {
        this.root = newTreNode;
        return newTreNode;
      }
      let currentNode = this.root;
      while (currentNode) {
        if (value === currentNode.value) return null;
        if (value > currentNode.value) {
          if (!currentNode.right) {
            currentNode.right = newTreNode;
            return newTreNode;
          }
          currentNode = currentNode.right;
        } else {
          if (!currentNode.left) {
            currentNode.left = newTreNode;
            return newTreNode;
          }
          currentNode = currentNode.left;
        }
      }
      return null;
    }

    public find<T>(value: T): TreeNode | null {
      let currentNode = this.root;
      while (currentNode) {
        if (value === currentNode.value) return currentNode;
        if (value > currentNode.value) {
          currentNode = currentNode.right;
        } else {
          currentNode = currentNode.left;
        }
      }
      return null;
    }

    public remove<T>(value: T): void {
      if (!this.root) return;
      let preNodeSide = removedSideEnum.root;
      let preNode = this.root;
      let currentNode: TreeNode | null = this.root;
      while (currentNode) {
        if (value === currentNode.value) {
          switch (preNodeSide) {
            case removedSideEnum.root: {
              this.root = null;
              break;
            }
            case removedSideEnum.left: {
              preNode.left = this.removeHelper(currentNode);
              break;
            }
            case removedSideEnum.right: {
              preNode.right = this.removeHelper(currentNode);
              break;
            }
            default:
              break;
          }
        }
        if (value > currentNode.value) {
          preNode = currentNode;
          preNodeSide = removedSideEnum.right;
          currentNode = currentNode.right;
        } else {
          preNode = currentNode;
          preNodeSide = removedSideEnum.left;
          currentNode = currentNode.left;
        }
      }
    }

    public loopTree(): any[] {
      let result = [];
      function _recursive(node: TreeNode | null) {
        if (node) {
          const nodeVal: any = node.value;
          result = result.concat(nodeVal);
        }
        if (node?.right) {
          _recursive(node?.right);
        }
        if (node?.left) {
          _recursive(node?.left);
        }
      }
      const rootNode = this.getRootNode();
      _recursive(rootNode);
      return result;
    }

    private removeHelper(node: TreeNode): TreeNode | null {
      const { left, right } = node;

      const onlyRight = !left && right;
      const onlyLeft = left && !right;
      const hasBoth = left && right;

      if (onlyRight) return right;
      if (onlyLeft) return left;
      if (hasBoth) {
        const leftestNodeForRightSide = this.findLeftestNode(right);
        leftestNodeForRightSide.left = left;
        return right;
      }

      return null;
    }

    private findLeftestNode(node: TreeNode): TreeNode {
      if (node.left) {
        return this.findLeftestNode(node.left);
      }
      return node;
    }
  }

  // const BST = new BinarySearchTree();

  // const initValues = [8, 3, 1, 6, 4, 7, 10, 14, 13];
  // initValues.forEach((num) => {
  //   BST.insert(num);
  // });

  // const removedNums = [3];
  // removedNums.forEach((num) => {
  //   BST.remove(num);
  // });

  // const test = BST.find(6);
  // console.log("test", test);
})();
