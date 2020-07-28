"use strict"

var express = require('express')
var router = express.Router()

var controller = require('../controllers/topic')
var Middleware = require('../helpers/middleware')

router.get(
	'/', 
	controller.list
)

router.get(
	'/:id', 
	controller.read
)

router.post(
	'/',
	Middleware.checkIsUser,  
	controller.create
)

router.put(
	'/:id',
	Middleware.checkIsUserAndTopicAuthor, 
	controller.update
)

router.delete(
	'/:id',
	Middleware.checkIsUserAndTopicAuthor, 
	controller.remove
)

router.post(
	'/addComment/:id',
	Middleware.checkIsUser, 
	controller.addComment
)

router.put(
	'/editComment/:topicId/:commentId',
	Middleware.checkIsUserAndTopicCommentAuthor,
	controller.editComment
)

router.delete(
	'/deleteComment/:topicId/:commentId',
	Middleware.checkIsUserAndTopicCommentAuthor,
	controller.deleteComment
)

router.post(
	'/addLike/:id',
	Middleware.checkIsUser,
	controller.addLike
)

router.post(
	'/addDisLike/:id',
	Middleware.checkIsUser,
	controller.addDisLike
)


module.exports = router;