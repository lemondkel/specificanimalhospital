var rootPath = process.cwd();
var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var db = require('./config/db/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var magazineDao = require(rootPath + '/routes/config/dao/Magazine');
var userScrapDao = require(rootPath + '/routes/config/dao/UserScrap');

const Magazine = sequelize.define('Magazine', magazineDao.info, magazineDao.desc);
const UserScrap = sequelize.define('UserScrap', userScrapDao.info, userScrapDao.desc);

/**
 * 병원 스크랩
 * @since 2018-10-20
 */
router.post('/scrap', function (req, res, next) {
	var userId = req.session.userid;
	if (userId !== undefined) {
		var magazineIdx = req.body.magazine_idx;

		UserScrap.create({
			scrap_type: 1,
			user_id: userId,
			scrap_idx: magazineIdx
		}).then(function () {
			Magazine.update({
				scrap: Sequelize.literal('scrap + 1')
			}, {
				where: {idx: magazineIdx}
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
 * 매거진 메인
 */
router.get('/list', function (req, res, next) {
	var limit = 12;   // number of records per page
	var offset = 0;
	var type = parseInt(req.query.type);
	var options1 = {};
	if (type !== 0) {
		options1.where = {
			type: type
		}
	}

	Magazine.findAndCountAll(options1)
		.then(function (data) {
			// console.log(data);
			var page = req.query.page !== undefined ? req.query.page : 1;
			var pages = Math.ceil(data.count / limit);
			offset = limit * (page - 1);
			var options2 = {
				limit: limit,
				offset: offset,
				order: [
					['idx', 'DESC']
				]
			};

			if (type !== 0) {
				options2.where = {
					type: type
				}
			}

			Magazine.findAll(options2).then(function (magazineList) {
				res.locals.menuid = 2;
				res.json({items: magazineList, count: data.count, page: pages, result: true, desc: "성공적으로 불러왔습니다."});
			});
		})
		.catch(function (error) {
			res.json({result: false, desc: error})
		});


});


module.exports = router;
