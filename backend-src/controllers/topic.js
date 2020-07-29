"use strict"

var CurdFactory = require('../helpers/CurdFactory')
var Topic = require('../models/Topic')
var User = require('../models/User')

module.exports = {

	list: function (req, res) {
		if (Object.keys(req.query).length === 0) {
			CurdFactory.list(Ad, req, res)
		} else {
			if (req.query.limit && req.query.skip && req.query.isHome) { //If got only skip&limit then
				console.log("xbbkjbfkljbf")
				let find = req.query.search ? { $or: [{ 'title': new RegExp(req.query.search, 'i') }, { 'description': new RegExp(req.query.search, 'i') }], isDeleted: false } : { isDeleted: false }
				Topic.find(find, 'id title imageUrl description videoId siteLink author comments likes.userId likes.like likes.userId disLikes.disLike disLikes.userId shares createdAt', { skip: parseInt(req.query.skip), limit: (parseInt(req.query.limit) > 100) ? 100 : parseInt(req.query.limit), sort: { likes: -1 } }, function (err, topic) {
					if (err) throw err;
					res.json(topic)
				}).populate('comments.userId', 'id name imageUrl').populate('author', 'id name imageUrl')
			} else if (req.query.limit && req.query.skip && req.query.category && req.query.subCategory) { //If got all 4 parameters then
				Topic.find({ category: req.query.category, subCategory: req.query.subCategory, isDeleted: false }, 'id title imageUrl description videoId siteLink author comments likes.userId likes.like likes.userId disLikes.disLike disLikes.userId shares createdAt', { skip: parseInt(req.query.skip), limit: (parseInt(req.query.limit) > 100) ? 100 : parseInt(req.query.limit), sort: { id: -1 } }, function (err, topic) {
					if (err) throw err;
					res.json(topic)
				}).populate('comments.userId', 'id name imageUrl').populate('author', 'id name imageUrl')
			} else if (req.query.limit && req.query.skip && req.query.category) { //If got 3 parameters
				Topic.find({ category: req.query.category, isDeleted: false }, 'id title imageUrl description videoId siteLink author comments likes.userId likes.like likes.userId disLikes.disLike disLikes.userId shares createdAt', { skip: parseInt(req.query.skip), limit: (parseInt(req.query.limit) > 100) ? 100 : parseInt(req.query.limit), sort: { id: -1 } }, function (err, topic) {
					if (err) throw err;
					res.json(topic)
				}).populate('comments.userId', 'id name imageUrl').populate('author', 'id name imageUrl')
			} else if (req.query.limit && req.query.skip) { //If got only skip&limit then
				let find = req.query.search ? { $or: [{ 'title': new RegExp(req.query.search, 'i') }, { 'description': new RegExp(req.query.search, 'i') }], isDeleted: false } : { isDeleted: false }
				Topic.find(find, 'id title imageUrl description videoId siteLink author comments likes.userId likes.like likes.userId disLikes.disLike disLikes.userId shares createdAt', { skip: parseInt(req.query.skip), limit: (parseInt(req.query.limit) > 100) ? 100 : parseInt(req.query.limit), sort: { id: -1 } }, function (err, topic) {
					if (err) throw err;
					res.json(topic)
				}).populate('comments.userId', 'id name imageUrl').populate('author', 'id name imageUrl')
			} else if (req.query.category && req.query.subCategory) { //If got 2 parameters without skip&limit then
				Topic.find({ category: req.query.category, subCategory: req.query.subCategory, isDeleted: false }, 'id title imageUrl description videoId siteLink author comments likes.userId likes.like likes.userId disLikes.disLike disLikes.userId shares createdAt', { skip: 0, limit: 5, sort: { id: -1 } }, function (err, topic) {
					if (err) throw err;
					res.json(topic)
				}).populate('comments.userId', 'id name imageUrl').populate('author', 'id name imageUrl')
			} else if (req.query.category) { //If got only category parameters then
				Topic.find({ category: req.query.category, isDeleted: false }, 'id title imageUrl description videoId siteLink author comments likes.userId likes.like likes.userId disLikes.disLike disLikes.userId shares createdAt', { skip: 0, limit: 5, sort: { id: -1 } }, function (err, topic) {
					if (err) throw err;
					res.json(topic)
				}).populate('comments.userId', 'id name imageUrl').populate('author', 'id name imageUrl')
			} else { //If got no parameters then
				Topic.find({ isDeleted: false }, 'id title imageUrl description videoId siteLink author comments likes.userId likes.like likes.userId disLikes.disLike disLikes.userId shares createdAt', { skip: 0, limit: 6, sort: { id: -1 } }, function (err, topic) {
					if (err) throw err;
					res.json(topic)
				}).populate('comments.userId', 'id name imageUrl').populate('author', 'id name imageUrl')
			}
		}
	},

	read: function (req, res) {
		let url = req.params.id.split('_')
		if (url.length == 4) {
			req.params.id = url[3]
			console.log(url[3])
		}
		Topic.find(isNaN(req.params.id) ? { id: new RegExp(req.params.id, 'i'), isDeleted: false } : { id: req.params.id, isDeleted: false }, function (err, topic) {
			if (err) throw err;
			res.json(topic)
		}).populate('comments.userId', 'id name imageUrl').populate('author', 'id name imageUrl')
	},

	create: function (req, res) {
		if (req.body.title && req.body.description) {
			var authToken = req.headers['authorization'] ? req.headers['authorization'].replace('Basic ', '') : ''
			User.find({ authToken: authToken }, '_id id name imageUrl', function (err, user) {
				if (err) throw err;
				req.body.author = user[0]._id
				var author = {
					_id: user[0]._id,
					id: user[0].id,
					name: user[0].name,
					imageUrl: user[0].imageUrl
				}
				Topic.create(req.body, function (err, response) {
					if (err) {
						res.status(404).send()
					} else {
						res.json({ _id: response._id, id: response.id, title: response.title, description: response.description, imageUrl: response.imageUrl, videoId: response.videoId, siteLink: response.siteLink, author: author, comments: [], likes: [], shares: [], createdAt: response.createdAt })
					}
				});
			})
		}
		else {
			res.status(404).send()
		}
	},

	update: function (req, res) {
		CurdFactory.update(Topic, req, res)
	},

	remove: function (req, res) {
		CurdFactory.remove(Topic, req, res);
	},

	addComment: function (req, res) {
		if (req.body.comment) {
			var authToken = req.headers['authorization'] ? req.headers['authorization'].replace('Basic ', '') : ''
			User.find({ authToken: authToken }, '_id id name imageUrl', function (err, user) {
				if (err) throw err;
				var comment = {
					userId: user[0]._id,
					comment: req.body.comment
				}
				Topic.findOneAndUpdate({ id: req.params.id }, { $push: { comments: comment } }, { new: true }, function (err, topic) {
					if (err) throw err;
					if (topic.comments.length > 0) {
						res.json({ id: topic.id, comments: { _id: topic.comments[topic.comments.length - 1]._id, comment: topic.comments[topic.comments.length - 1].comment, userId: { _id: user[0]._id, id: user[0].id, name: user[0].name, imageUrl: user[0].imageUrl }, createdAt: topic.comments[topic.comments.length - 1].createdAt } })
					} else {
						res.status(404).send()
					}
				})
			})
		}
		else {
			res.status(404).send()
		}
	},

	editComment: function (req, res) {
		if (req.body.comment) {
			Topic.findOneAndUpdate({ 'comments._id': req.params.commentId }, { '$set': { 'comments.$.comment': req.body.comment } }, { new: true }, function (err, topic) {
				if (err) throw err;
				res.json({ id: topic.id, commentId: req.params.commentId, comment: req.body.comment })
			})
		}
		else {
			res.status(404).send()
		}
	},

	deleteComment: function (req, res) {
		Topic.findOneAndUpdate({ id: req.params.topicId }, { $pull: { comments: { _id: req.params.commentId } } }, { new: true }, function (err, topic) {
			if (err) throw err;
			res.json({ id: topic.id, commentId: req.params.commentId })
		})
	},

	addLike: function (req, res) {
		var authToken = req.headers['authorization'] ? req.headers['authorization'].replace('Basic ', '') : ''
		User.find({ authToken: authToken }, '_id', function (err, user) {
			if (err) throw err;
			Topic.find({ id: req.params.id }, function (err, topic) {
				if (err) throw err;
				if (topic.length) {
					var likeIndex = topic[0].likes.findIndex(lik => { return String(lik.userId) == String(user[0]._id) })
					let disLikeIndex = topic[0].disLikes.findIndex(disL => { return String(disL.userId) == String(user[0]._id) })
					if (likeIndex == -1) {
						var like = {
							userId: user[0]._id,
							like: 1
						}
						let data = {}
						if (disLikeIndex != -1) {
							var disLikes = [...topic[0].disLikes]
							disLikes[disLikeIndex].disLike = 0
							data = { $push: { likes: like }, disLikes: disLikes }
						} else {
							data = { $push: { likes: like } }
						}
						Topic.findOneAndUpdate({ id: req.params.id }, data, { new: true }, function (err, editedTopic) {
							res.json({ id: editedTopic.id, like: 1, likes: editedTopic.likes, disLikes: editedTopic.disLikes })
						})
					} else {
						let data = {}
						var likes = [...topic[0].likes]
						likes[likeIndex].like = !likes[likeIndex].like
						data = { likes: likes }
						if (disLikeIndex != -1 && likes[likeIndex].like) {
							var disLikes = [...topic[0].disLikes]
							disLikes[disLikeIndex].disLike = 0
							data = { likes: likes, disLikes: disLikes }
						}
						Topic.findOneAndUpdate({ id: req.params.id }, data, { new: true }, function (err, editedTopic) {
							res.json({ id: editedTopic.id, like: likes[likeIndex].like, likes: editedTopic.likes, disLikes: editedTopic.disLikes })
						})

					}
				}
			})
		})
	},

	addDisLike: function (req, res) {
		var authToken = req.headers['authorization'] ? req.headers['authorization'].replace('Basic ', '') : ''
		User.find({ authToken: authToken }, '_id', function (err, user) {
			if (err) throw err;
			Topic.find({ id: req.params.id }, function (err, topic) {
				if (err) throw err;
				if (topic.length) {
					var likeIndex = topic[0].likes.findIndex(lik => { return String(lik.userId) == String(user[0]._id) })
					let disLikeIndex = topic[0].disLikes.findIndex(disL => { return String(disL.userId) == String(user[0]._id) })
					if (disLikeIndex == -1) {
						var disLike = {
							userId: user[0]._id,
							disLike: 1
						}
						let data = {}
						if (likeIndex != -1) {
							var likes = [...topic[0].likes]
							likes[likeIndex].like = 0
							data = { $push: { disLikes: disLike }, likes: likes }
						} else {
							data = { $push: { disLikes: disLike } }
						}
						Topic.findOneAndUpdate({ id: req.params.id }, data, { new: true }, function (err, editedTopic) {
							res.json({ id: editedTopic.id, disLike: 1, disLikes: editedTopic.disLikes, likes: editedTopic.likes })
						})
					} else {
						let data = {}
						var disLikes = [...topic[0].disLikes]
						disLikes[disLikeIndex].disLike = !disLikes[disLikeIndex].disLike
						data = { disLikes: disLikes }
						if (likeIndex != -1 && disLikes[disLikeIndex].disLike) {
							var likes = [...topic[0].likes]
							likes[likeIndex].like = 0
							data = { disLikes: disLikes, likes: likes }
						}
						Topic.findOneAndUpdate({ id: req.params.id }, data, { new: true }, function (err, editedTopic) {
							res.json({ id: editedTopic.id, disLike: disLikes[disLikeIndex].disLike, disLikes: editedTopic.disLikes, likes: editedTopic.likes })
						})

					}
				}
			})
		})
	}

}