class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

const Stack = (function() {

  const stack = {}

  return class {
    constructor() {
      stack.size = 0
      stack.bottom = null
      stack.top = null
    }

    push(value) {
      const newNode = new Node(value)

      stack.size += 1

      if (!stack.top) {
        stack.top = newNode
        stack.bottom = newNode

        return stack
      }

      newNode.next = stack.top
      stack.top = newNode

      return stack
    }

    pop() {
      const elementPoped = stack.top.value
      stack.top = stack.top.next
      stack.size -= 1

      return elementPoped
    }

    isEmpty() {
      return stack.bottom === null
    }

    peek() {
      return stack.top
    }

    size() {
      return stack.size
    }

    clear() {
      stack.bottom = null
      stack.top = null
      stack.size = 0

      return stack
    }
  }

})()


const stack = new Stack()