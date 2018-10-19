var rootPath = process.cwd();
var express = require('express');
var router = express.Router();
/*

 var Sequelize = require('sequelize');
 var db = require('./config/db').info;
 var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);
 */

/**
 * 로그인
 * @since 2018-10-12
 */
router.get('/login', function (req, res, next) {
	res.locals.menuid = 3;
	res.render('user/login');
});

/**
 * 회원가입 스텝 1
 * @since 2018-10-12
 */
router.get('/join_step1', function (req, res, next) {
	res.locals.menuid = 3;
	res.render('user/join_step1');
});

/**
 * 회원가입 스텝 2
 * @since 2018-10-12
 */
router.get('/join_step2', function (req, res, next) {
	res.locals.menuid = 3;
	res.render('user/join_step2');
});

/**
 * 회원가입 스텝 3
 * @since 2018-10-14
 */
router.get('/join_step3', function (req, res, next) {
	res.locals.menuid = 3;
	res.render('user/join_step3');
});

/**
 * 마이페이지
 * @since 2018-10-14
 */
router.get('/mypage', function (req, res, next) {
	res.locals.menuid = 3;
	res.render('user/mypage');
});

module.exports = router;