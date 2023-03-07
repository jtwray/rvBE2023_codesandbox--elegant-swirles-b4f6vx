const db = require('../../data/dbConfig.js')



// 'landowner' & 'listing'

module.exports = {
  find,
  findBy,
  findById,
  findTasks,
  // findlandownerlisting,
  add,
  addlisting,
  addTask,
  update,
  remove
}

function findTasks (id) {
  return db('tasks ')
    .join('landowner', 'landowner.id', 'tasks.landowner_id')
    .select('tasks.id', 'landowner.landowner_name', 'tasks.id', 'tasks.notes', 'tasks.description', 'tasks.completed')
    .where('tasks.landowner_id', id)
    .orderBy('tasks.id', 'asc')
}
// array of all landowner
function find () {
  return db('landowner')
}

function findBy(prop,filter) {
   let table=prop.toString()
  return db(table)
    .where(filter)
}


function findById (id) {
  console.log(id)
  return db('landowner')
    .where('id', id)
    .first()
}


function add (landowner) {
  return db('landowner')
    .insert(landowner, 'id')
    .then(([id]) => {
      return findById(id)
    })
}

function addlisting (listing, landowner_id) {
  return db('listing')
    .insert({ ...listing, landowner_id })
    .then(([id]) => {
      return db('listing')
        .where({ id })
    })
}

function addTask (task, landowner_id) {
  return db('tasks')
    .insert({ ...task, landowner_id })
    .then(([id]) => {
      return db('tasks')
        .where({ id })
    })
}

function update (changes, id) {
  return changes.landowner_id
    ? db('landowner')
      .where({ id })
      .update(changes)
      .then(() => findById(id))
    : db('listing')
      .where({ id })
      .update(changes)
      .then(() => findById(id))
}

function remove (id) {
  return db('landowner')
    .where({ id })
    .del()
    .then(() => findById(id))
}


// function findlandownerlisting (id) {
//   return db('listing as rs')
//     .join('landowner_listing as p_rs', 'rs.id', 'p_rs.listing_id')
//     .join('landowner as p', 'p_rs.landowner_id', 'p.id')
//     .select('p_rs.landowner_id', 'p.landowner_name', 'rs.listing_name', 'p.description')
//     .where('p_rs.landowner_id', id)
//   // .orderBy('listing_id', 'asc')
// }

// module.exports = {
//   add, find, findBy, findById
// }

// function find() {
//   return db('landowner').select('id', 'username', 'password')
// }

// function findBy(filter) {
//   return db('landowner')
//     .where(filter)
// }


// function findById (id) {
//   console.log(id)
//   return db('landowner')
//     .where('id', id)
//     .first()
// }
// function findById(id) {
//   return db('landowner').where({ id }).first()
// }

// async function add(user) {
//   const [id] = await db('landowner').insert(user,'id')
//   return findById(id)
// }
// // async function add(user) {
// //   let ids = await db('users').insert(user,'id')
// //   const [id] = ids
// //   return findById(id)