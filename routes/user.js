var rootPath = process.cwd();
var express = require('express');
var router = express.Router();
/*

var Sequelize = require('sequelize');
var db = require('./config/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);
*/

/* GET users listing. */
router.get('/login', function (req, res, next) {
	res.render('login', {title: 'Express'});
});

/* GET users listing. */
router.get('/join', function (req, res, next) {
	res.render('join', {title: 'Express'});
});

module.exports = router;