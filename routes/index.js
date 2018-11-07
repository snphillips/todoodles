const { Router } = require('express');
const router = Router();

const today = require('./today');
const thisweek = require('./thisweek');
const thismonth = require('./thismonth');
const sometime = require('./sometime');

// Routing middleware: Two parameters:
// 1) the namespace as a string
// 2) bind either today, thisweek, thismonth or sometime  as routing middleware
router.use('/today', today);
router.use('/thisweek', thisweek);
router.use('/thismonth', thismonth);
router.use('/sometime', sometime);

module.exports = router;
