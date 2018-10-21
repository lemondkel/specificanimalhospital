
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
		star: {
			type: Sequelize.INTEGER
		},
		text: {
			type: Sequelize.STRING(500)
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