var rootPath = process.cwd();
var express = require('express');
var router = express.Router();
/*

 var Sequelize = require('sequelize');
 var db = require('./config/db').info;
 var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);
 */

/**
 * 병원 스크랩
 * @since 2018-10-20
 */
router.post('/scrap/hospital', function (req, res, next) {
	if (req.session.userid !== undefined) {
		res.jsoin({
			result: true,
			desc: "성공적으로 스크랩되었습니다."
		})
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
	if (req.session.userid !== undefined) {
		res.jsoin({
			result: true,
			desc: "성공적으로 작성되었습니다."
		})
	} else {
		res.json({
			result: false,
			code: 600,
			desc: "로그인이 필요합니다."
		})
	}
});

module.exports = router;
