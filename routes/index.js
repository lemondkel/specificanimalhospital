var rootPath = process.cwd();
var express = require('express');
var router = express.Router();

 var Sequelize = require('sequelize');
 var db = require('./config/db/db').info;
 var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var magazineDao = require(rootPath + '/routes/config/dao/Magazine');
var hospitalDao = require(rootPath + '/routes/config/dao/Hospital');
var shopDao = require(rootPath + '/routes/config/dao/Shop');

const Magazine = sequelize.define('Magazine', magazineDao.info, magazineDao.desc);
const Hospital = sequelize.define('Hospital', hospitalDao.info, hospitalDao.desc);
const Shop = sequelize.define('Shop', shopDao.info, shopDao.desc);

/* GET home page. */
router.get('/', function (req, res, next) {

	Hospital.findAll({
	}).then(function (data) {
		Shop.findAll({
		}).then(function (data2) {
			Magazine.findAll({
			}).then(function (data3) {
				res.locals.menuid = 0;
				res.render('main', {hospitalList : data, shopList : data2, magazineList : data3});
			});
		});
	});
});

module.exports = router;
