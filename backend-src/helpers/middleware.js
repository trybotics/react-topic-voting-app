"use strict"

var User = require('../models/User')
var Topic = require('../models/Topic')

module.exports = {

	checkIsUser: function (req, res, next) {
		var authToken = req.headers['authorization'] ? req.headers['authorization'].replace('Basic ', '') : ''
		User.find({ authToken: authToken }, '_id', function (err, user) {
			if (err) throw err;
			if (user.length > 0) {
				if (user[0].isDeleted) {
					res.status(403).send()
				} else {
					next()
				}
			} else {
				res.status(401).send()
			}
		})
	},

	checkUserIsSuperAdmin: function (req, res, next) {
		var authToken = req.headers['authorization'] ? req.headers['authorization'].replace('Basic ', '') : ''
		User.find({ authToken: authToken }, 'isAdmin', function (err, user) {
			if (err) throw err;
			if (user.length > 0 && user[0].isAdmin) {
				next()
			} else {
				res.status(401).send()
			}
		})
	},

	checkUserIsOwner: function (req, res, next) {
		var authToken = req.headers['authorization'] ? req.headers['authorization'].replace('Basic ', '') : ''
		User.find({ id: req.params.id }, 'authToken', function (err, user) {
			if (err) throw err;
			if (user.length > 0 && user[0].authToken == authToken) {
				if (user[0].isDeleted) {
					res.status(403).send()
				} else {
					next()
				}
			} else {
				res.status(401).send()
			}
		})
	},

	checkIsUserAndTopicAuthor: function (req, res, next) {
		var authToken = req.headers['authorization'] ? req.headers['authorization'].replace('Basic ', '') : ''
		User.find({ authToken: authToken }, '_id', function (err, user) {
			if (err) throw err;

			if (user.length > 0) {
				Topic.find({ $and: [{ id: req.params.id }, { author: user[0]._id }] }, function (err, topic) {
					if (err) throw err;
					if (topic.length > 0) {
						next()
					} else {
						res.status(401).send()
					}
				})
			} else {
				res.status(401).send()
			}
		})
	},

	checkIsUserAndTopicCommentAuthor: function (req, res, next) {
		var authToken = req.headers['authorization'] ? req.headers['authorization'].replace('Basic ', '') : ''
		User.find({ authToken: authToken }, '_id', function (err, user) {
			if (err) throw err;

			if (user.length > 0) {
				Topic.find({ id: req.params.topicId, comments: { $elemMatch: { _id: req.params.commentId, userId: user[0]._id } } }, function (err, topic) {
					if (err) throw err;
					if (topic.length > 0) {
						next()
					} else {
						res.status(401).send()
					}
				})
			} else {
				res.status(401).send()
			}
		})
	}
}