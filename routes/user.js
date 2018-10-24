var rootPath = process.cwd();
var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var db = require('./config/db/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var userDao = require('./config/dao/User');
var userScrapDao = require('./config/dao/UserScrap');
var hospitalDao = require('./config/dao/Hospital');
var magazineDao = require('./config/dao/Magazine');

const User = sequelize.define('User', userDao.info, userDao.desc);
const UserScrap = sequelize.define('UserScrap', userScrapDao.info, userScrapDao.desc);
const Hospital = sequelize.define('Hospital', hospitalDao.info, hospitalDao.desc);
const Magazine = sequelize.define('Magazine', magazineDao.info, magazineDao.desc);

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
	UserScrap.findAll({
		limit: 3,
		attributes: ['scrap_idx'],
		where: {
			scrap_type: 0,
			user_id: req.session.userid
		},
		order: [
			['idx', 'DESC']
		]
	}).then(function (hospitalIdxList) {
		var idxArr = [];
		for (var i = 0; i < hospitalIdxList.length; i++) {
			idxArr.push(hospitalIdxList[i].scrap_idx);
		}
		var option1 = {
			order: [
				['idx', 'DESC']
			],
			limit: 3,
			where: {
				idx: idxArr
			}
		};

		Hospital.findAll(option1).then(function (hospitalScrapList) {
			UserScrap.findAll({
				limit: 3,
				attributes: ['scrap_idx'],
				where: {
					scrap_type: 1,
					user_id: req.session.userid
				},
				order: [
					['idx', 'DESC']
				]
			}).then(function (magazineIdxList) {
				var idxArr = [];
				for (var i = 0; i < magazineIdxList.length; i++) {
					idxArr.push(magazineIdxList[i].scrap_idx);
				}
				var option1 = {
					order: [
						['idx', 'DESC']
					],
					limit: 3,
					where: {
						idx: idxArr
					}
				};

				Magazine.findAll(option1).then(function (magazineScrapList) {
					User.findOne({
						where: {
							id: req.session.userid
						}
					}).then(function (data) {
						res.locals.menuid = 3;
						res.render('user/mypage', {
							user: data,
							hospitalScrapList: hospitalScrapList,
							magazineScrapList: magazineScrapList
						});
					});
				});
			});
		});
	});
});

module.exports = router;