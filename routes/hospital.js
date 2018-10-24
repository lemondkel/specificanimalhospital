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
router.get('/list', function (req, res, next) {
	var limit = 12;   // number of records per page
	var offset = 0;
	var type = parseInt(req.query.type !== undefined ? req.query.type : 0);
	var localType = parseInt(req.query.localType !== undefined ? req.query.localType : -1);
	var filter = req.query.filter !== undefined ? req.query.filter : "id";
	var subLocalText = req.query.subLocalText !== undefined ? req.query.subLocalText : "";
	subLocalText.replace(/_/g, ' ');
	var options1 = {where: {}};
	if (type !== 0) {
		options1.where.animals = {like: '%' + type + '%'};
	}
	if (localType !== -1) {
		var localName;
		switch (localType) {
			case 0:
				localName = '서울';
				break;
			case 1:
				localName = '경기';
				break;
			case 2:
				localName = '인천';
				break;
			case 3:
				localName = '강원도';
				break;
			case 4:
				localName = '대전';
				break;
			case 5:
				localName = '세종';
				break;
			case 6:
				localName = '충청남도';
				break;
			case 7:
				localName = '충청북도';
				break;
			case 8:
				localName = '부산';
				break;
			case 9:
				localName = '울산';
				break;
			case 10:
				localName = '경상남도';
				break;
			case 11:
				localName = '경상북도';
				break;
			case 12:
				localName = '대구';
				break;
			case 13:
				localName = '광주';
				break;
			case 14:
				localName = '전라남도';
				break;
			case 15:
				localName = '전라북도';
				break;
			case 16:
				localName = '제주';
				break;
		}
		options1.where.address = {like: '%' + localName + '%'};
		if (subLocalText !== "") {
			options1.where.address= {
				$and: [{like: '%' + localName + '%'}, {like: '%' + subLocalText + '%'}]
			}
		}
	}
	Hospital.findAndCountAll(options1)
		.then(function (data) {
			// console.log(data);
			var page = req.query.page !== undefined ? req.query.page : 1;      // page number
			var pages = Math.ceil(data.count / limit);
			offset = limit * (page - 1);
			var options2 = {
				limit: limit,
				offset: offset,
				order: [
					['idx', 'DESC']
				],
				where: {}
			};

			if(filter !== 'id') {
				switch(filter) {
					case 'scrap':
						options2.order = [
							['scrap', 'DESC']
						];
						break;
					case 'title':
						options2.order = [
							['title', 'DESC']
						];
						break;
				}
			}

			if (type !== 0) {
				options2.where.animals = {like: '%' + type + '%'};
			}
			if (localType !== -1) {
				var localName;
				switch (localType) {
					case 0:
						localName = '서울';
						break;
					case 1:
						localName = '경기';
						break;
					case 2:
						localName = '인천';
						break;
					case 3:
						localName = '강원도';
						break;
					case 4:
						localName = '대전';
						break;
					case 5:
						localName = '세종';
						break;
					case 6:
						localName = '충청남도';
						break;
					case 7:
						localName = '충청북도';
						break;
					case 8:
						localName = '부산';
						break;
					case 9:
						localName = '울산';
						break;
					case 10:
						localName = '경상남도';
						break;
					case 11:
						localName = '경상북도';
						break;
					case 12:
						localName = '대구';
						break;
					case 13:
						localName = '광주';
						break;
					case 14:
						localName = '전라남도';
						break;
					case 15:
						localName = '전라북도';
						break;
					case 16:
						localName = '제주';
						break;
				}
				options2.where.address = {like: '%' + localName + '%'};
				if (subLocalText !== "") {
					options2.where.address= {
						$and: [{like: '%' + localName + '%'}, {like: '%' + subLocalText + '%'}]
					}
				}
			}
			Hospital.findAll(options2).then(function (hospitalList) {
				console.log(hospitalList);

				res.locals.menuid = 1;
				res.render('hospital/list', {
					items: hospitalList,
					count: data.count,
					page: pages,
					type: type,
					localType: localType,
					subLocalText : subLocalText,
					filter : filter
				});
			});
		})
		.catch(function (error) {
			res.status(500).send('Internal Server Error');
		});


});

/**
 * 병원 상세
 */
router.get('/detail/:id', function (req, res, next) {
	Hospital.findOne({
		where: {
			idx: req.params.id
		}
	}).then(function (data) {
		res.locals.menuid = 1;
		res.render('hospital/detail', {hospitalIdx: req.params.id, item: data});
	});
});

/**
 * 병원 후기작성
 */
router.get('/write_board/:id', function (req, res, next) {
	Hospital.findOne({
		where: {
			idx: req.params.id
		}
	}).then(function (data) {
		res.locals.menuid = 1;
		res.render('hospital/write_board', {hospitalIdx: req.params.id, item: data});
	});
});

module.exports = router;