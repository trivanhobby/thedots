var dbDriver = require('lowdb');
const lodashId = require('lodash-id');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./data/db/db.json')

class DB {

  constructor() {
    this.db = dbDriver(adapter)
    let db = this.db
    let _ = db._

    db
      .defaults({"epics":[], "sprints":[], "defects":[], "resolutions":[]})
      .write()
    db._.mixin(lodashId)
    db._.mixin({
      last: function(array) {
        return _.maxBy(array, 'ts')
      }
    })
  }

  get(key, findOpts) {
    return findOpts ? this.db.get(key).find(findOpts).value() : this.db.get(key).value()
  }

  getAll(key, findOpts) {
    return findOpts ? this.db.get(key).filter(findOpts).value() : this.db.get(key).value()
  }

  last(key, findOpts) {
    return (findOpts ? this.db.get(key).filter(findOpts) : this.db.get(key))
      .last()
      .value()
  }

  push(key, value) {
    return this.db.get(key)
      .insert(value)
      .write()
  }

  remove(key, findOpts) {
    this.db.get(key).remove(findOpts).write()
  }

  update(key, findOpts, newValue) {
    var item = this.db.get(key)
      .find(findOpts)

    if (!item) {
      item = this.push(key, newValue)
    } else {
      this.db.get(key).remove(findOpts).write()
      item = this.push(key, newValue)
    }
    return item
  }

  flush() {
    return this.cache.clear();
  }
}

module.exports = {db: DB}