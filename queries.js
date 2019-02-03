

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

// Not using  for this app but keep for reference
const getToDoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM todos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const createToDo = (request, response) => {
  const { todoitem } = request.body
  const { displaystrikethrough }  = request.body.displaystrikethrough

  pool.query('INSERT INTO todos (todoitem, displaystrikethrough) VALUES ($1, $2)', [todoitem, request.body.displaystrikethrough], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Todo added with a body of ${todoitem}`)
    console.log(`Todo added. Item is: ${request.body.todoitem} and strikesthrough is: ${request.body.displaystrikethrough}`)
  })
}



const updateToDo = (request, response) => {
  const position  = parseInt(request.params.id)
  const displaystrikethrough  = request.body.displaystrikethrough
  const id  = request.body.id
  const todoitem  = request.body.todoitem

  console.log(`position: ${position}, id: ${id}, todoitem: ${todoitem}, request.body.displaystrikethrough: ${displaystrikethrough}`)

  pool.query(
    // `UPDATE todos
    //  SET displaystrikethrough = $1
    //  WHERE id = $2`,
    // [displaystrikethrough, id],

    `UPDATE todos
     SET displaystrikethrough = $1
     WHERE todoitem = $2`,
    [displaystrikethrough, todoitem],

    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`todoitem modified with position: ${position}, id: ${id} and displaystrikethrough is: ${request.body.displaystrikethrough}` )
    }
  )
}

// const updateToDo = (request, response) => {
//   const id = parseInt(request.params.id)
//   const displaystrikethrough   = request.body.displaystrikethrough

//   console.log(`The id of ${id} and a request.body.displaystrikethrough of: ${request.body.displaystrikethrough}`)

//   pool.query(
//     // 'UPDATE todos SET displaystrikethrough = true WHERE id = $1',
//     `UPDATE todos
//      SET displaystrikethrough = ${request.body.displaystrikethrough}
//      WHERE id = $1`,
//     [id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`todoitem modified with id: ${id} and displaystrikethrough is: ${request.body.displaystrikethrough}` )
//     }
//   )
// }



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
  getToDoById,
  createToDo,
  updateToDo,
  deleteToDo,
}
