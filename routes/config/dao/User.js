/*
 * Created by Administrator on 2018-01-26.
 */
var Sequelize = require('sequelize');

module.exports = {
	info: {
		id: {
			type: Sequelize.STRING(50),
			primaryKey: true
		},
		pw: {
			type: Sequelize.STRING(500)
		},
		name: {
			type: Sequelize.STRING(20)
		},
		nick: {
			type: Sequelize.STRING(20)
		},
		email: {
			type: Sequelize.STRING(50)
		},
		phone: {
			type: Sequelize.STRING(20)
		},
		zipCode: {
			type: Sequelize.STRING(20)
		},
		address1: {
			type: Sequelize.STRING(500)
		},
		address2: {
			type: Sequelize.STRING(5000)
		},
		acceptEmail: {
			type: Sequelize.TINYINT(1),
			defaultValue: false
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