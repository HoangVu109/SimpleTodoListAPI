const express = require('express')
const router = express.Router()
const {authMiddleware} = require('../middlewares/authMiddleware')
const {create, update} = require('../controllers/todoControllers')
const { ownerAuthMiddleware } = require('../middlewares/ownerAuthMiddleware')

router.use(authMiddleware)

router.post('/', create)
router.post('/:todoId',ownerAuthMiddleware,update)
module.exports = router;