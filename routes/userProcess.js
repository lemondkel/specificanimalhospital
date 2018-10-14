var rootPath = process.cwd();
var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var db = require(rootPath + '/routes/config/db/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var userDao = require('./config/dao/User');

const User = sequelize.define('User', userDao.info, userDao.desc);

/**
 * 아이디 중복확인
 * @since 2018-10-14
 */
router.post('/idCheck', function (req, res, next) {
	var id = req.body.id;

	User.findOne({
		attributes: [
			"id"
		],
		where: {
			id: id
		}
	}).then(function (data) {
		if (data === null) {
			res.json({result: true, desc: "사용할 수 있는 아이디입니다."});
		} else {
			res.json({result: false, desc: "이미 등록된 아이디입니다."});
		}
	}).catch(function (err) {
		console.log(err);
		res.json({result: false, desc: '서버 에러'});
	});
});

/**
 * 닉네임 중복확인
 * @since 2018-10-14
 */
router.post('/nickCheck', function (req, res, next) {
	var nick = req.body.nick;
	var desc;

	User.findOne({
		attributes: [
			"nick"
		],
		where: {
			nick: nick
		}
	}).then(function (data) {
		if (data === null) {
			res.json({result: true, desc: "사용할 수 있는 닉네임입니다."});
		} else {
			res.json({result: false, desc: "이미 등록된 닉네임입니다."});
		}

	}).catch(function (err) {
		console.log(err);
		res.json({result: false, desc: '서버 에러'});
	});
});

/**
 * 회원가입
 * @since 2018-10-14
 */
router.post('/create', function (req, res, next) {
	var id = req.body.id;
	var pw = req.body.pw;
	var name = req.body.name;
	var nick = req.body.nick;
	var email = req.body.email;
	var phone = req.body.phone;
	var zipCode = req.body.zipCode;
	var address1 = req.body.address1;
	var address2 = req.body.address2;
	var acceptEmail = req.body.acceptEmail;

	User.create({
		id: id,
		pw: pw,
		name: name,
		nick: nick,
		email: email,
		phone: phone,
		zipCode: zipCode,
		address1: address1,
		address2: address2,
		acceptEmail: acceptEmail
	}).then(function (result) {
		req.session.userid = id;
		req.session.username = name;
		res.json({result: true, desc: result});
	}).catch(function (err) {
		console.log(err);
		if (err.name.indexOf('SequelizeUniqueConstraintError') > -1) {
			res.json({result: false, desc: '유니크값 오류'});
		}
		else {
			res.json({result: false, desc: '서버 에러'});
		}
	})
});

/**
 * 로그인
 * @since 2018-10-14
 */
router.post('/login', function (req, res, next) {
	var id = req.body.id;
	var pw = req.body.pw;

	User.findOne({
		where: {
			id: id
		}
	}).then(function (data) {
		if (data !== null) {
			User.findOne({
				where: {
					id: id,
					pw: pw
				}
			}).then(function (data) {
				console.log(data);
				if (data !== null) {
					console.log(data);
					req.session.userid = data.id;
					req.session.username = data.name;

					res.json({result: true, desc: '로그인 완료'});
				} else {
					res.json({result: false, desc: '비밀번호가 일치하지 않습니다'});
				}
			});
		} else {
			res.json({result: false, desc: '아이디가 존재하지 않습니다'});
		}
	}).catch(function (err) {
		res.json({result: false, desc: '서버 에러'});
	});
});

router.get('/logout', function (req, res, next) {
	delete req.session.userid;
	delete req.session.username;

	res.redirect('/');
});

module.exports = router;