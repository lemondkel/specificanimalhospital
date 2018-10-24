var rootPath = process.cwd();
var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var db = require('./config/db/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var magazineDao = require(rootPath + '/routes/config/dao/Magazine');

const Magazine = sequelize.define('Magazine', magazineDao.info, magazineDao.desc);

/**
 * 매거진 메인
 */
router.get('/list', function (req, res, next) {
	var limit = 12;   // number of records per page
	var offset = 0;
	var type = parseInt(req.query.type !== undefined ? req.query.type : 0);
	var options1 = {};
	if (type !== 0) {
		options1.where = {
			type: type
		}
	}
	Magazine.findAndCountAll(options1)
		.then(function (data) {
			// console.log(data);
			var page = req.query.page !== undefined ? req.query.page : 1;      // page number
			var pages = Math.ceil(data.count / limit);
			offset = limit * (page - 1);
			var options2 = {
				limit: limit,
				offset: offset,
				order: [
					['idx', 'DESC']
				]
			};
			if (type !== 0) {
				options2.where = {
					type: type
				}
			}

			Magazine.findAll(options2).then(function (magazineList) {
				res.locals.menuid = 2;
				res.render('magazine/list', {items: magazineList, count: data.count, page: pages});
			});
		})
		.catch(function (error) {
			res.status(500).send('Internal Server Error');
		});
});

/**
 * 매거진 상세
 */
router.get('/detail/:id', function (req, res, next) {
	Magazine.update({
		viewCount: Sequelize.literal('viewCount + 1')
	}, {
		where: {idx: req.params.id}
	}).then(function () {
		Magazine.findOne({
			where: {
				idx: req.params.id
			}
		}).then(function (data) {
			res.locals.menuid = 2;
			res.render('magazine/detail', {item: data});
		})
	});

});

module.exports = router;
