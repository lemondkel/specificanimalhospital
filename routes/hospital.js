var rootPath = process.cwd();
var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var db = require('./config/db/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var hospitalDao = require(rootPath + '/routes/config/dao/Hospital');

const Hospital = sequelize.define('Hospital', hospitalDao.info, hospitalDao.desc);

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
	Hospital.findOne({
		where: {
			idx: req.params.id
		}
	}).then(function (data) {
		res.locals.menuid = 1;
		res.render('hospital/detail', {hospitalIdx : req.params.id, item: data});
	});
});

/**
 * 병원 후기작성
 */
router.get('/write_board/:id', function(req, res, next) {
	Hospital.findOne({
		where: {
			idx: req.params.id
		}
	}).then(function (data) {
		res.locals.menuid = 1;
		res.render('hospital/write_board', {hospitalIdx : req.params.id, item: data});
	});
});

module.exports = router;