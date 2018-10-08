var rootPath = process.cwd();
var express = require('express');
var router = express.Router();
/*

var Sequelize = require('sequelize');
var db = require('./config/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);
*/

/* GET home page. */
router.get('/hospital', function(req, res, next) {
	res.render('hospital', { title: 'Express' });
});

/* GET home page. */
router.get('/hospital/detail/:id', function(req, res, next) {
	res.render('hospital/detail', { title: 'Express' });
});

module.exports = router;
