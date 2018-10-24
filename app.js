var rootPath = process.cwd();
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var Sequelize = require('sequelize');
var db = require(rootPath + '/routes/config/db/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var userDao = require(rootPath + '/routes/config/dao/User');
var userScrapDao = require(rootPath + '/routes/config/dao/UserScrap');
var hospitalDao = require(rootPath + '/routes/config/dao/Hospital');
var hospitalBoardDao = require(rootPath + '/routes/config/dao/HospitalBoard');
var shopDao = require(rootPath + '/routes/config/dao/Shop');
var magazineDao = require(rootPath + '/routes/config/dao/Magazine');
var magazineLikeDao = require(rootPath + '/routes/config/dao/MagazineLike');
var qnADao = require(rootPath + '/routes/config/dao/QnA');
var qnAFileDao = require(rootPath + '/routes/config/dao/QnAFile');
var qnACommentDao = require(rootPath + '/routes/config/dao/QnAComment');
var qnAReCommentDao = require(rootPath + '/routes/config/dao/QnAReComment');

const User = sequelize.define('User', userDao.info, userDao.desc);
const UserScrap = sequelize.define('UserScrap', userScrapDao.info, userScrapDao.desc);
const Hospital = sequelize.define('Hospital', hospitalDao.info, hospitalDao.desc);
const HospitalBoard = sequelize.define('HospitalBoard', hospitalBoardDao.info, hospitalBoardDao.desc);
const Shop = sequelize.define('Shop', shopDao.info, shopDao.desc);
const Magazine = sequelize.define('Magazine', magazineDao.info, magazineDao.desc);
const MagazineLike = sequelize.define('MagazineLike', magazineLikeDao.info, magazineLikeDao.desc);
const QnA = sequelize.define('QnA', qnADao.info, qnADao.desc);
const QnAFile = sequelize.define('QnAFile', qnAFileDao.info, qnAFileDao.desc);
const QnAComment = sequelize.define('QnAComment', qnACommentDao.info, qnACommentDao.desc);
const QnAReComment = sequelize.define('QnAReComment', qnAReCommentDao.info, qnAReCommentDao.desc);

HospitalBoard.belongsTo(Hospital, {foreignKey: "hospital_idx"});
HospitalBoard.belongsTo(User, {foreignKey: "user_id"});

MagazineLike.belongsTo(Magazine, {foreignKey: "magazine_idx"});
MagazineLike.belongsTo(User, {foreignKey: "user_id"});

QnA.belongsTo(User, {foreignKey: "user_id"});

QnAComment.belongsTo(QnA, {foreignKey: "qna_idx"});
QnAComment.belongsTo(User, {foreignKey: "user_id"});

QnAFile.belongsTo(QnA, {foreignKey: "qna_idx"});

QnAReComment.belongsTo(QnAComment, {foreignKey: "qna_comment_idx"});
QnAReComment.belongsTo(User, {foreignKey: "user_id"});

UserScrap.belongsTo(User, {foreignKey: "user_id"});

User.sync();
UserScrap.sync();
Hospital.sync();
HospitalBoard.sync();
Shop.sync();
Magazine.sync();
MagazineLike.sync();
QnA.sync();
QnAFile.sync();
QnAComment.sync();
QnAReComment.sync();

var index = require('./routes/index');
var user = require('./routes/user');
var hospital = require('./routes/hospital');
var magazine = require('./routes/magazine');
var shop = require('./routes/shop');
var qna = require('./routes/qna');

var userProcess = require('./routes/userProcess');
var hospitalProcess = require('./routes/hospitalProcess');
var magazineProcess = require('./routes/magazineProcess');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
	resave: false,
	saveUninitialized: true
}));

app.use(function (req, res, next) {
	res.locals.userid = req.session.userid;
	res.locals.username = req.session.username;

	next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/user/process', userProcess);
app.use('/hospital', hospital);
app.use('/hospital/process', hospitalProcess);
app.use('/magazine/process', magazineProcess);
app.use('/magazine', magazine);
app.use('/shop', shop);
app.use('/qna', qna);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
