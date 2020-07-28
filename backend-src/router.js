var express = require('express')
var router = express.Router()

router.use('/user', require('./routers/user'))
router.use('/topic', require('./routers/topic'))

module.exports = router;