var rootPath = process.cwd();
var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var db = require('./config/db/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var hospitalDao = require(rootPath + '/routes/config/dao/Hospital');
var hospitalBoardDao = require(rootPath + '/routes/config/dao/HospitalBoard');
var userScrapDao = require(rootPath + '/routes/config/dao/UserScrap');

const Hospital = sequelize.define('Hospital', hospitalDao.info, hospitalDao.desc);
const HospitalBoard = sequelize.define('HospitalBoard', hospitalBoardDao.info, hospitalBoardDao.desc);
const UserScrap = sequelize.define('UserScrap', userScrapDao.info, userScrapDao.desc);

/**
 * 병원 스크랩
 * @since 2018-10-20
 */
router.post('/scrap/hospital', function (req, res, next) {
	var userId = req.session.userid;
	if (userId !== undefined) {
		var hospitalIdx = req.body.hospital_idx;

		UserScrap.create({
			scrap_type: 0,
			user_id: userId,
			scrap_idx: hospitalIdx
		}).then(function () {
			Hospital.update({
				scrap: Sequelize.literal('scrap + 1')
			}, {
				where: {idx: hospitalIdx}
			}).then(function () {
				res.json({result: true, desc: "성공적으로 스크랩되었습니다."});
			}).catch(function (err) {
				if (err.name.indexOf('SequelizeUniqueConstraintError') > -1) {
					res.json({result: false, desc: '유니크값 오류'});
				}
				else {
					res.json({result: false, desc: '서버 에러'});
				}
			});
		}).catch(function (err) {
			if (err.name.indexOf('SequelizeUniqueConstraintError') > -1) {
				res.json({result: false, desc: '유니크값 오류'});
			}
			else {
				res.json({result: false, desc: '서버 에러'});
			}
		});
	} else {
		res.json({
			result: false,
			code: 600,
			desc: "로그인이 필요합니다."
		})
	}
});

/**
 * 병원 후기작성
 * @since 2018-10-20
 */
router.post('/create/board', function (req, res, next) {
	var userId = req.session.userid;
	if (userId !== undefined) {
		var hospitalIdx = req.body.hospital_idx;
		var star = req.body.star;
		var text = req.body.text;

		HospitalBoard.create({
			hospital_idx: hospitalIdx,
			user_id: userId,
			star: star,
			text: text
		}).then(function (result) {
			res.json({result: true, desc: result});
		}).catch(function (err) {
			if (err.name.indexOf('SequelizeUniqueConstraintError') > -1) {
				res.json({result: false, desc: '유니크값 오류'});
			}
			else {
				res.json({result: false, desc: '서버 에러'});
			}
		});
	} else {
		res.json({
			result: false,
			code: 600,
			desc: "로그인이 필요합니다."
		})
	}
});

module.exports = router;
