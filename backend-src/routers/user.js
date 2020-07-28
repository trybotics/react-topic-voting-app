"use strict"

var express = require('express')
var router = express.Router()

var controller = require('../controllers/user')
var Middleware = require('../helpers/middleware')

router.get(
	'/getAuthUser',
	Middleware.checkIsUser,
	controller.getAuthUser
)

router.get(
	'/',
	controller.list
)

router.get(
	'/:id',
	Middleware.checkUserIsOwner,
	controller.read
)

router.put(
	'/:id',
	Middleware.checkUserIsOwner, 
	controller.update
)

router.delete(
	'/:id',
	Middleware.checkUserIsOwner, 
	controller.remove
)

router.post(
	'/signup', 
	controller.signup
)

router.post(
	'/login', 
	controller.login
)

router.post(
	'/socialLogin', 
	controller.socialLogin
)

module.exports = router;