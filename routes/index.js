var rootPath = process.cwd();
var express = require('express');
var router = express.Router();
/*

 var Sequelize = require('sequelize');
 var db = require('./config/db').info;
 var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);
 */

/* GET home page. */
router.get('/', function (req, res, next) {
	res.locals.menuid = 0;
	res.render('main');
});

module.exports = router;
