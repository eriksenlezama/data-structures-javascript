class Node {
  constructor() {
    this.children = new Map()
    this.terminal = false
    this.parent = null
  }

  isTerminal() {
    return this.terminal
  }
  setTerminal() {
    this.terminal = true
  }
  unsetTerminal() {
    this.terminal = false
  }
}

export const Trie = (function () {

  const trie = {}

  return class {
    constructor() {
      trie.root = new Node()
    }

    insert(value, node = trie.root, parent = null) {
      if (typeof value !== 'string') {
        return null
      }

      node.parent = parent

      if (value.length === 0) {
        node.setTerminal()
        return trie
      }

      if (!node.children.has(value.charAt(0))) {
        node.children.set(value.charAt(0), new Node())
        return this.insert(value.substring(1), node.children.get(value.charAt(0)), node)
      } else {
        return this.insert(value.substring(1), node.children.get(value.charAt(0)), node)
      }
    }

    find(value, node = trie.root) {
      if (node.children.has(value.charAt(0))) {
        if (value.length === 1 && node.children.get(value.charAt(0)).isTerminal()) {
          return true
        } else {
          return this.find(value.substring(1), node.children.get(value.charAt(0)))
        }
      } else {
        return false
      }
    }
  }
})()