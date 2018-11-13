const Pool = require('pg').Pool

const pool = process.env.DATABASE_URL || new Pool({
  user: 'snphillips',
  host: process.env.DB_HOST || 'localhost',
  database: 'todoodles',
  password: 'password',
  port: process.env.DB_PORT || 5432,
})


const getToDos = (request, response) => {
  pool.query('SELECT * FROM todos', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
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

  pool.query('INSERT INTO todos (todoitem) VALUES ($1)', [todoitem], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Todo added.`)
  })
}


const updateToDo = (request, response) => {
  const id = parseInt(request.params.id)
  // one problem is that request.body is the id number, not content
  const { todoitem } = request.body
  console.log("Hello from updateToDo. request.body is:", request.body)

  pool.query(
    'UPDATE todos SET todoitem = $2 WHERE id = $1',
    [todoitem, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`todoitem modified with ID: ${id}` )

    }
  )
}


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
