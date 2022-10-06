export const HashTable = (function () {

  const defaultSize = 71
  const hashTable = new Array(defaultSize)

  return class {
    hash(key) {
      let index = 0
      for (let i = 0; i < key.length; i++) {
        index += key.charCodeAt(i)
      }

      return index % defaultSize
    }

    set(key, value) {
      const hashedKey = this.hash(key)

      if (!hashTable[hashedKey]) {
        hashTable[hashedKey] = {}
        hashTable[hashedKey][key] = value
      } else {
        hashTable[hashedKey][key] = value
      }

      return hashTable
    }

    delete(key) {
      const hashedKey = this.hash(key)

      if (!hashTable[hashedKey]) return null

      if (Object.keys(hashTable[hashedKey]).includes(key)) {
        delete hashTable[hashedKey][key]
      }

      if (Object.keys(hashTable[hashedKey]).length === 0) {
        delete hashTable[hashedKey]
      }

      return hashTable
    }

    get(key) {
      const hashedKey = this.hash(key)

      if (!hashTable[hashedKey]) return null

      return hashTable[hashedKey][key]
    }

    has(key) {
      const hashedKey = this.hash(key)

      if (!hashTable[hashedKey]) return false
      if (!hashTable[hashedKey][key]) return false

      return true
    }
  }

})()