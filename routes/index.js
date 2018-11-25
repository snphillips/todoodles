const { Router } = require('express');
const router = Router();

const queries = require('./queries');

// Routing middleware: Two parameters:
// 1) the namespace as a string. In this case, /todos
// 2) bind queries as routing middleware
router.use('/todos', queries);

module.exports = router;
