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

    exist(value) {
      let currentNode = tree.root

      if (value === currentNode.value) return true;

      while (currentNode) {
        if (value < currentNode.value) {

          if (!currentNode.left) return false

          if (value === currentNode.left.value) {
            return true
          } else {
            currentNode = currentNode.left
          }

        } else {

          if (!currentNode.right) return false

          if (value === currentNode.right.value) {
            return true
          } else {
            currentNode = currentNode.right
          }

        }
      }
    }

    find(value, node = tree.root) {
      let currentNode = node

      if (!currentNode) return null
      if (currentNode.value === value) return currentNode

      if (value < currentNode.value) {
        return this.find(value, currentNode.left)
      } else {
        return this.find(value, currentNode.right)
      }
    }

    delete(value) {
      let currentNode = tree.root

      while (currentNode) {
        if (currentNode.value === value) {
          if (!currentNode.left && !currentNode.right) {
            currentNode.value === null
            return tree
          } else {

            let replacingNode
            let previousReplacingNode

            if (currentNode.right) {
              [replacingNode, previousReplacingNode] = this.findLeftMostAndPrevious(currentNode.right)
              currentNode.value = replacingNode.value
              if (replacingNode.right) {
                replacingNode = replacingNode.right
              } else {
                previousReplacingNode.left = null
              }
            } else {
              [replacingNode, previousReplacingNode] = this.findRightMostAndPrevious(currentNode.left)
              currentNode.value = replacingNode.value
              if (replacingNode.left) {
                replacingNode = replacingNode.left
              } else {
                previousReplacingNode.right = null
              }
            }

            return tree
          }

        } else {

          if (value < currentNode.value) {
            currentNode = currentNode.left
          } else {
            currentNode = currentNode.right
          }

        }
      }

      return null
    }

    findLeftMostAndPrevious(node = tree.root) {
      if (!node.value) return null

      let currentNode = node
      let previousCurrentNode = node
      let tempNode

      while (currentNode) {
        if (currentNode.left) {
          if (currentNode !== previousCurrentNode) {
            tempNode = currentNode
            currentNode = currentNode.left
            previousCurrentNode = tempNode
          }
          currentNode = currentNode.left
          if (currentNode.left) {
            previousCurrentNode = currentNode
            currentNode = currentNode.left
          }
        } else {
          return [currentNode, previousCurrentNode]
        }
      }
    }

    findRightMostAndPrevious(node = tree.root) {
      if (!node.value) return null

      let currentNode = node
      let previousCurrentNode = node
      let tempNode

      while (currentNode) {
        if (currentNode.right) {
          if (currentNode !== previousCurrentNode) {
            tempNode = currentNode
            currentNode = currentNode.right
            previousCurrentNode = tempNode
          }
          currentNode = currentNode.right
          if (currentNode.right) {
            previousCurrentNode = currentNode
            currentNode = currentNode.right
          }
        } else {
          return [currentNode, previousCurrentNode]
        }
      }
    }
  }
})()