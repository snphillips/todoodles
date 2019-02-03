

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
    console.log(`Todo added. todoitem = ${todoitem} and request.body = ${request.body}`)
    console.log(`Todo added. Item is: ${request.body.todoitem} and strikesthrough is: ${request.body.displaystrikethrough}`)
  })
}




const updateToDo = (request, response) => {
  const id = parseInt(request.params.id)
  // const item = request.params.todoitem
  // one problem is that request.body is the id number, not content
  // const { displaystrikethrough } = request.body
  const displaystrikethrough  = request.body.displaystrikethrough
  console.log("Hello from updateToDo. request.body is:", request.body)
  console.log("request.body.displaystrikethrough", request.body.displaystrikethrough)

// TODO: displaystrikethrough needs to toggle here. Can be true or false.
  pool.query(
    // 'UPDATE todos SET displaystrikethrough = true WHERE id = $1',
    `UPDATE todos SET displaystrikethrough = ${request.body.displaystrikethrough} WHERE id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`todoitem modified with id: ${id} and displaystrikethrough is: ${request.body.displaystrikethrough}` )
    }
  )
}

// const updateToDo = (request, response) => {
//   const id = parseInt(request.params.id)
//   // const item = request.params.todoitem
//   // one problem is that request.body is the id number, not content
//   const { todoitem } = request.body
//   console.log("Hello from updateToDo. request.body is:", request.body)

//   pool.query(
//     'UPDATE todos SET todoitem = $2 WHERE id = $1',
//     [todoitem, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`todoitem modified with ID: ${id}` )
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
