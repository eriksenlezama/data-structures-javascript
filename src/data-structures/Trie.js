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

    delete(value, node = trie.root, initialValue = '') {
      const { children } = node

      if (!children.has(value.charAt(0))) return null

      if (value.length === 1 && children.get(value.charAt(0)).isTerminal()) {
        children.get(value.charAt(0)).unsetTerminal()

        if (children.get(value.charAt(0)).children.size === 0) {
          let parent = children.get(value.charAt(0)).parent
          while (parent) {
            if (parent.terminal || parent.children.size > 1) {
              parent.children.delete(initialValue.charAt(initialValue.length - 1))
              break
            }
            parent = parent.parent
            initialValue = initialValue.substring(0, initialValue.length - 1)
          }
        }

      } else {
        this.delete(value.substring(1), children.get(value.charAt(0)), initialValue || value)
      }

      return trie
    }

    printWords() {
      const words = []

      const search = (node = trie.root, text = '') => {
        if (node.children.size !== 0) {
          for (let letter of node.children.keys()) {
            search(node.children.get(letter), text.concat(letter))
          }

          if (node.isTerminal()) {
            words.push(text)
          }
        } else {
          text.length > 0 && words.push(text) // check empty
          return
        }
      }
      search()
      return words.length > 0 && words // check empty
    }
  }
})()