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
  }
})()