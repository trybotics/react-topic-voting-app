"use strict"

var CurdFactory = require('../helpers/CurdFactory')
var User = require('../models/User')

var rand = function () {
	return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function () {
	return rand()
};

module.exports = {
	list: function (req, res) {
		User.find({ isDeleted: false }, '_id id name imageUrl', { skip: parseInt(req.query.skip), limit: parseInt(req.query.limit), sort: { id: -1 } }, function (err, user) {
			if (err) throw err;
			res.json(user)
		})
	},

	read: function (req, res) {
		User.find({ id: req.params.id, isDeleted: false }, '_id id name email phone imageUrl isAdmin', function (err, user) {
			if (err) throw err;
			res.json(user)
		})
	},

	update: function (req, res) {
		CurdFactory.update(User, req, res)
	},

	remove: function (req, res) {
		CurdFactory.remove(User, req, res);
	},

	signup: function (req, res) {

		if (req.body.name && req.body.email && req.body.phone && req.body.password) {
			User.find({ email: req.body.email }, function (err, user) {
				if (err) throw err;
				if (user.length) {
					res.json({ User: true })
				} else {
					req.body.authToken = Buffer.from(req.body.email + ':' + token()).toString('base64')
					User.create(req.body, function (err, createdUser) {
						if (err) {
							res.status(404).send()
						} else {
							res.json(createdUser)
						}
					});
				}
			})
		}
		else {
			res.status(404).send()
		}
	},

	login: function (req, res) {
		if (req.body.email && req.body.password) {
			User.find(req.body, function (err, user) {
				if (err) throw err;
				if (user.length && user[0].isDeleted) {
					res.status(403).send()
				} else {
					res.json(user)
				}
			});
		}
		else {
			res.status(401).send()
		}
	},

	socialLogin: function (req, res) {
		if (req.body.name && req.body.socialId && req.body.imageUrl && ["googleId", "facebookId", "linkedinId", "twitterId"].includes(req.body.type)) {
			var whereClause = {}
			if (req.body.email) {
				whereClause = { $or: [{ email: req.body.email }, { [req.body.type]: req.body.socialId }] }
			} else {
				whereClause = { [req.body.type]: req.body.socialId }
			}
			User.find(whereClause, function (err, user) {
				if (err) throw err;
				if (user.length > 0) {
					if (user[0].isDeleted) {
						res.status(403).send()
					}
					else {
						let newData = {}
						if (user[0].email && !user[0][req.body.type]) {
							newData[req.body.type] = req.body.socialId
						} else if (!user[0].email && user[0][req.body.type]) {
							newData['email'] = req.body.email
						}
						newData['imageUrl'] = req.body.imageUrl
						User.findOneAndUpdate(whereClause, newData, { new: true }, function (err, updatedUser) {
							if (err) throw err;
							res.json({ user: updatedUser, isSignIn: true })
						});
					}
				} else {
					req.body.authToken = Buffer.from((req.body.email ? req.body.email : req.body.socialId) + ':' + token()).toString('base64')
					req.body[req.body.type] = req.body.socialId
					delete req.body.type
					delete req.body.socialId
					User.create(req.body, function (err, createdUser) {
						if (err) throw err;
						res.json(createdUser)
					});
				}
			});
		}
		else {
			res.status(404).send()
		}
	},

	getAuthUser: function (req, res) {
		var authToken = req.headers['authorization'] ? req.headers['authorization'].replace('Basic ', '') : ''
		User.find({ authToken: authToken, isDeleted: false }, '_id id authToken name email phone imageUrl socialId isAdmin', function (err, user) {
			if (err) throw err;
			res.json(user)
		});
	}
}