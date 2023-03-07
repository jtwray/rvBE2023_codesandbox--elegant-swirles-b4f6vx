const db = require('../../data/dbConfig.js')


module.exports = {
  find,
  findBy,
  findById,
  add,
  // update,
}

function find () {
  return db('rv').select('id', 'username', 'password')
}

function findBy (prop,filter) {
  let table=prop.toString()
  return db(table)
    .where(filter)
}

function findById (id) {
  console.log(id)
  return db('rv').where('id',id).first()
}

function add (rv) {
  return db('rv')
    .insert(rv, 'id')
    .then(([id]) => {
      return findById(id)
    })
}