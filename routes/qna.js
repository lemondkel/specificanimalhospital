var rootPath = process.cwd();
var express = require('express');
var router = express.Router();
/*

 var Sequelize = require('sequelize');
 var db = require('./config/db').info;
 var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);
 */

/**
 * 마이페이지
 * @since 2018-10-14
 */
router.get('/list', function (req, res, next) {
	res.locals.menuid = 5;
	res.render('qna/list');
});

module.exports = router;