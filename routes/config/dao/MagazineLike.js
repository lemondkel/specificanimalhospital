/*
 * Created by Administrator on 2018-01-26.
 */
var Sequelize = require('sequelize');

module.exports = {
	info: {
		idx: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	},
	desc : {
		charset: 'utf8',
		collate: 'utf8_unicode_ci'
	}
};