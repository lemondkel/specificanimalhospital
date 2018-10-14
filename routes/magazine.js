var rootPath = process.cwd();
var express = require('express');
var router = express.Router();
/*

var Sequelize = require('sequelize');
var db = require('./config/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);
*/

/**
 * 매거진 메인
 */
router.get('/list', function(req, res, next) {
	res.render('magazine/list');
});

/**
 * 매거진 상세
 */
router.get('/detail/:id', function(req, res, next) {
	res.render('magazine/detail');
});

module.exports = router;
