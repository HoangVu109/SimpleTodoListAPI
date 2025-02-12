const express = require('express')
const router = express.Router()
const {authMiddleware} = require('../middlewares/authMiddleware')
const {create} = require('../controllers/todoControllers')

router.use(authMiddleware)
router.post('/', create)

module.exports = router;