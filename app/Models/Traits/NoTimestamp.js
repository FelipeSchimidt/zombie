'use strict'

class NoTimestamp {
  register (Model) {
    Object.defineProperties(Model, {
      createdAtColumn: {
        get: () => null
      },
      updatedAtColumn: {
        get: () => null,
        set: () => Date.now()
      }
    })
  }
}

module.exports = NoTimestamp
