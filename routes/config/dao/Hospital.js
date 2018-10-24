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
		},
		title: {
			type: Sequelize.STRING(100)
		},
		animals: {
			type: Sequelize.STRING(50)
		},
		phone: {
			type: Sequelize.STRING(50)
		},
		address: {
			type: Sequelize.STRING(1000)
		},
		latitude : {
			type : Sequelize.DOUBLE
		},
		longitude : {
			type : Sequelize.DOUBLE
		},
		time_weekday: {
			type: Sequelize.STRING(50)
		},
		time_holiday: {
			type: Sequelize.STRING(50)
		},
		time_closed: {
			type: Sequelize.STRING(50)
		},
		site : {
			type: Sequelize.STRING(200)
		},
		scrap : {
			type : Sequelize.INTEGER,
			defaultValue : 0
		},
		images : {
			type : Sequelize.STRING(1000)
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	desc : {
		charset: 'utf8',
		collate: 'utf8_unicode_ci'
	}
};