const express = require('express')
const router = express.Router()
const {authMiddleware} = require('../middlewares/authMiddleware')
const {todoCreate, todoUpdate, todoDelete, todoGet} = require('../controllers/todoControllers')
const {ownerAuthMiddleware} = require('../middlewares/ownerAuthMiddleware')

router.use(authMiddleware)
router.post('/', todoCreate)

router.post('/:todoId',ownerAuthMiddleware,todoUpdate)
router.delete('/:todoId',ownerAuthMiddleware, todoDelete)
router.get('/',todoGet)


module.exports = router;