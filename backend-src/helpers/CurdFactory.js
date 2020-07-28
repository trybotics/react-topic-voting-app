"use strict";

var _ = require('lodash');
const util = require('util');

module.exports = {
	list: function (Model, req, res) {
		Model.find({ isDeleted: false }, function (err, result) {
			if (err) throw err;
			res.json(result)
		})
	},

	read: function (Model, req, res) {
		let url = req.params.id.split('_')
		if (url.length == 4) {
			req.params.id = url[3]
			console.log(url[3])
		}
		Model.find(isNaN(req.params.id) ? { id: new RegExp(req.params.id, 'i'), isDeleted: false } : { id: req.params.id, isDeleted: false }, function (err, result) {
			if (err) throw err;
			res.json(result)
		})
	},

	create: function (Model, req, res) {
		Model.create(req.body, function (err, response) {
			if (err) {
				res.status(404).send()
			} else {
				res.json(response)
			}
		});
	},

	update: function (Model, req, res) {
		var newvalues = { $set: req.body }
		Model.findOneAndUpdate({ id: req.params.id }, newvalues, { new: true }, function (err, result) {
			if (err) {
				console.log(err)
				res.status(404).send()
			} else {
				res.json(result)
			}
		})
	},

	remove: function (Model, req, res) {
		Model.findOne({ id: req.params.id }, function (err, result) {
			if (err) throw err;
			if (result) {
				result.remove()
				res.status(202).send();
			} else {
				res.status(404).send()
			}
		})
	}
};
