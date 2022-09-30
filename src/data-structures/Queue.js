class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

const Queue = (function() {
  const queue = {}

  return class {
    constructor() {
      queue.head = null
      queue.tail = null
      queue.size = 0
    }

    enqueue(value) {
      const newNode = new Node(value)

      queue.size += 1

      if (!queue.head) {
        queue.head = newNode
        queue.tail = newNode

        return queue
      }

      queue.tail.next = newNode
      queue.tail = newNode

      return queue
    }

    dequeue() {
      if (!queue.head) return

      const head = queue.head

      if (queue.head.next) {
        queue.head = queue.head.next
      } else {
        queue.head = null
        queue.tail = null
      }

      queue.size -= 1

      return head
    }

    isEmpty() {
      return queue.head === null
    }

    peek() {
      if (queue.head) return queue.head

      return null
    }

    size() {
      return queue.size
    }

    toArray() {
      const array = []

      if (!queue.head) return array

      let currentNode = queue.head

      while (currentNode) {
        array.push(currentNode.value)
        currentNode = currentNode.next
      }

      return array
    }

    toString() {
      return this.toArray().toString()
    }
  }
})()

const queue = new Queue()
