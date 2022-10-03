class Node {
  constructor(value, next = null, prev = null) {
    this.value = value
    this.next = next
    this.prev = prev
  }
}

export const DoublyLinkedList = (function () {
  const doublyLinkedList = {}

  return class {
    constructor() {
      doublyLinkedList.size = 0
      doublyLinkedList.head = null
      doublyLinkedList.tail = null
    }

    append(value) {
      const newNode = new Node(value)

      doublyLinkedList.size += 1

      if (!doublyLinkedList.head) {
        doublyLinkedList.head = newNode
        doublyLinkedList.tail = newNode

        return doublyLinkedList
      }

      newNode.prev = doublyLinkedList.tail
      doublyLinkedList.tail.next = newNode
      doublyLinkedList.tail = newNode

      return doublyLinkedList
    }

    prepend(value) {
      const newNode = new Node(value)

      if (doublyLinkedList.head) {
        doublyLinkedList.head.prev = newNode
        newNode.next = doublyLinkedList.head
      }

      doublyLinkedList.head = newNode
      doublyLinkedList.size += 1

      if (!doublyLinkedList.tail) {
        doublyLinkedList.tail = newNode
      }

      return doublyLinkedList
    }

    insert(value, index) {
      if(index <= 0) {
        this.prepend(value)
      } else if (index > doublyLinkedList.size) {
        this.append(value)
      } else {
        let currentNode = doublyLinkedList.head
        let count = 1

        while (count < index - 1) {
          currentNode = currentNode.next
          count += 1
        }

        const newNode = new Node(value, currentNode.next, currentNode)

        currentNode.next = newNode
        doublyLinkedList.size += 1
      }

      return doublyLinkedList
    }

    delete(index) {
      if (index <= 0) {
        this.deleteHead()
      } else if (index > doublyLinkedList.size) {
        this.deleteTail()
      } else {
        let currentNode = doublyLinkedList.head
        let count = 1

        while (count < index - 1) {
          currentNode = currentNode.next
          count += 1
        }

        if (currentNode.next?.next) {
          currentNode.next = currentNode.next.next
          currentNode.next.prev = currentNode
        } else {
          currentNode.next = null
          doublyLinkedList.tail = currentNode
        }

        doublyLinkedList.size -= 1
      }

      return doublyLinkedList
    }

    deleteHead() {
      if (!doublyLinkedList.head) return null

      const head = doublyLinkedList.head

      if (doublyLinkedList.head.next) {
        doublyLinkedList.head = doublyLinkedList.head.next
        doublyLinkedList.head.prev = null
      } else {
        doublyLinkedList.head = null
        doublyLinkedList.tail = null
        doublyLinkedList.value = null
      }

      doublyLinkedList.size -= 1

      return head
    }

    deleteTail() {
      return this.delete(doublyLinkedList.size)
    }

    toArray() {
      if (doublyLinkedList.head) {
        let currentNode = doublyLinkedList.head
        const array = []

        array.push(currentNode.value)

        while (currentNode.next) {
          currentNode = currentNode.next
          array.push(currentNode.value)
        }

        return array
      }

      return null
    }

    toString() {
      const array = this.toArray()

      return array.toString()
    }
  }

})()
