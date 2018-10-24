var rootPath = process.cwd();
var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var db = require('./config/db/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var shopDao = require(rootPath + '/routes/config/dao/Shop');

const Shop = sequelize.define('Shop', shopDao.info, shopDao.desc);

/**
 * 샵 메인
 */
router.get('/list', function(req, res, next) {
	var limit = 12;   // number of records per page
	var offset = 0;
	var type = parseInt(req.query.type !== undefined ? req.query.type : 0);
	var options1 = {};
	if (type !== 0) {
		options1.where = {
			animals: {like: '%' + type + '%'}
		}
	}
	Shop.findAndCountAll(options1)
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
					animals: {like: '%' + type + '%'}
				}
			}

			Shop.findAll(options2).then(function (shopList) {
				res.locals.menuid = 4;
				res.render('shop/list', {shopList: shopList, count: data.count, page: pages, type: type});
			});
		})
		.catch(function (error) {
			res.status(500).send('Internal Server Error');
		});

});

/**
 * 샵 상세
 */
router.get('/detail/:id', function(req, res, next) {
	res.locals.menuid = 4;
	res.render('shop/detail');
});

module.exports = router;
