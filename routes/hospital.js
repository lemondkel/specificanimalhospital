var rootPath = process.cwd();
var express = require('express');
var router = express.Router();
/*

var Sequelize = require('sequelize');
var db = require('./config/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);
*/

/**
 * 병원 메인
 */
router.get('/list', function(req, res, next) {
	res.locals.menuid = 1;
	res.render('hospital/list');
});

/**
 * 병원 상세
 */
router.get('/detail/:id', function(req, res, next) {
	res.locals.menuid = 1;
	res.render('hospital/detail');
});

module.exports = router;
