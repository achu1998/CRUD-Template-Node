const express = require('express')
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller')
const store = require('../middleware/multer')


/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes)

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


// API
route.post('/api/users', store.array('userPhoto',1), controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)

//upload
route.post('/api/uploadImage', store.array('userPhoto',1), controller.uploadImage)


module.exports = route