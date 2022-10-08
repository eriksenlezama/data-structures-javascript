class Node {
  constructor(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

export const Tree = (function() {

  const tree = {}

  return class {
    constructor() {
      tree.root = null
    }

    add(value) {
      const newNode = new Node(value)

      if (!tree.root) {
        tree.root = newNode
        return tree
      }

      let currentNode = tree.root

      while (currentNode) {
        if (value === currentNode.value) break;
        if (value < currentNode.value) {

          if (!currentNode.left) {
            currentNode.left = newNode
            return tree
          } else {
            currentNode = currentNode.left
          }

        } else {

          if (!currentNode.right) {
            currentNode.right = newNode
            return tree
          } else {
            currentNode = currentNode.right
          }

        }
      }

      return tree
    }
  }
})()