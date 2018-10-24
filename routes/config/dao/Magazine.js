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
		thumbnail: {
			type: Sequelize.STRING(500)
		},
		text: {
			type: Sequelize.STRING(500)
		},
		images: {
			type: Sequelize.STRING(1000)
		},
		viewCount : {
			type : Sequelize.INTEGER,
			defaultValue : 0
		},
		scrap : {
			type : Sequelize.INTEGER,
			defaultValue : 0
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