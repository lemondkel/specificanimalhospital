var rootPath = process.cwd();
var express = require('express');
var router = express.Router();

 var Sequelize = require('sequelize');
 var db = require('./config/db/db').info;
 var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var hospitalDao = require(rootPath + '/routes/config/dao/Hospital');
var shopDao = require(rootPath + '/routes/config/dao/Shop');

const Hospital = sequelize.define('Hospital', hospitalDao.info, hospitalDao.desc);
const Shop = sequelize.define('Shop', shopDao.info, shopDao.desc);

/* GET home page. */
router.get('/', function (req, res, next) {

	Hospital.findAll({
	}).then(function (data) {
		Shop.findAll({
		}).then(function (data2) {
			res.locals.menuid = 0;
			res.render('main', {hospitalList : data, shopList : data2});
		});
	});
});

module.exports = router;
