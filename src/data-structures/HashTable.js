import {LinkedList} from './LinkedList.js'

export const HashTable = (function () {

  const hashTable = {}

  return class {
    constructor() {
      // I chose a prime number less than 100 for the max size of the hast table.
      hashTable.max_size = 71
      hashTable.size = 0
    }

    hash(key) {
      const initialValue = 0
      const index = Array.from(key).reduce((sum, val) => sum + val.charCodeAt(), initialValue)

      return index % hashTable.max_size
    }

    insert(key, value) {
      const index = this.hash(key)

      if (!hashTable[index]) {
        hashTable[index] = value
        hashTable.size += 1
      }
    }
  }

})()