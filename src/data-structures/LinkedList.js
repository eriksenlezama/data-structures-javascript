class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}
// TODO: add toString of values
const LinkedList = (function () {
  const linkedList = {}

  return class {
    constructor() {
      linkedList.size = 0
      linkedList.head = null
      linkedList.tail = null
    }

    append(value) {
      const newNode = new Node(value)

      linkedList.size += 1

      if (!linkedList.head) {
        linkedList.head = newNode
        linkedList.tail = newNode

        return linkedList
      }

      linkedList.tail.next = newNode
      linkedList.tail = newNode

      return linkedList
    }

    prepend(value) {
      const newNode = new Node(value, linkedList.head)

      linkedList.head = newNode
      linkedList.size += 1

      if (!linkedList.tail) {
        linkedList.tail = newNode
      }

      return linkedList
    }

    insert(value, index) {
      if(index <= 0) {
        this.prepend(value)
      } else if (index >= linkedList.size) {
        this.append(value)
      } else {
        let currentNode = linkedList.head
        let count = 1

        while (count < index - 1) {
          currentNode = currentNode.next
          count += 1
        }

        const newNode = new Node(value, currentNode.next)

        currentNode.next = newNode
        linkedList.size += 1
      }

      return linkedList
    }

    delete(index) {
      if (index <= 0) {
        this.deleteHead()
      } else if (index > linkedList.size) {
        this.deleteTail()
      } else {
        let currentNode = linkedList.head
        let count = 1

        while (count < index - 1) {
          currentNode = currentNode.next
          count += 1
        }

        if (currentNode.next?.next) {
          currentNode.next = currentNode.next.next
        } else {
          currentNode.next = null
          linkedList.tail = currentNode
        }

        linkedList.size -= 1
      }

      return linkedList
    }

    deleteHead() {
      if (!linkedList.head) return null

      const head = linkedList.head

      if (linkedList.head.next) {
        linkedList.head = linkedList.head.next
      } else {
        linkedList.head = null
        linkedList.tail = null
        linkedList.value = null
      }

      linkedList.size -= 1

      return head
    }

    deleteTail() {
      return this.delete(linkedList.size)
    }
  }

})()

const linkedList = new LinkedList()