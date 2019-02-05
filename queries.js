

const pool = require('./config/dbConfig');




const getToDos = (request, response) => {
  pool.query('SELECT * FROM todos', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
    console.log("hello from getToDos in queries.js")
  })
}


const getToDoByUserId = (request, response) => {
  const user_id = parseInt(request.params.user_id)

  pool.query('SELECT * FROM todos WHERE user_id = $1', [user_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const createToDo = (request, response) => {
  // Here's all the information about the item that's being created
  const user_id = request.body.user_id
  const { todoitem } = request.body
  const displaystrikethrough   = request.body.displaystrikethrough

  pool.query('INSERT INTO todos (user_id, todoitem, displaystrikethrough) VALUES ($1, $2, $3)', [user_id, todoitem, request.body.displaystrikethrough], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Todo added with a body of ${todoitem}`)
    console.log(`Todo added. Item is: ${request.body.todoitem} and strikesthrough is: ${request.body.displaystrikethrough}`)
  })
}



const updateToDo = (request, response) => {
  // Here's all the information about the item we're going to update/put
  const position  = parseInt(request.params.id)
  const displaystrikethrough  = request.body.displaystrikethrough
  const id  = request.body.id
  const todoitem  = request.body.todoitem
  const user_id = request.body.user_id

  console.log(`position: ${position}, id: ${id}, user_id: ${user_id}, todoitem: ${todoitem}, request.body.displaystrikethrough: ${displaystrikethrough}`)

  // The psql query that updates the database
  pool.query(
    `UPDATE todos
     SET displaystrikethrough = $1
     WHERE todoitem = $2`,
    [displaystrikethrough, todoitem],

    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`todoitem at position ${position} and id of ${id} and user_id: ${user_id} modified. Displaystrikethrough is: ${request.body.displaystrikethrough}` )
    }
  )
}



// do I need to add a user_id here? Or, do all todos have a unique id, regardless of user_id?
// potential problem: if I'm deleting based on where an item shows up in the list, but the client list may
// be different than the master list
const deleteToDo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM todos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`todoitem deleted with ID: ${id}`)
  })
}



module.exports = {
  getToDos,
  getToDoByUserId,
  createToDo,
  updateToDo,
  deleteToDo,
}
