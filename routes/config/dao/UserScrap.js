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
		user_id: {
			type: Sequelize.STRING(50)
		},
		scrap_type: {
			type: Sequelize.INTEGER
		},
		scrap_idx: {
			type: Sequelize.INTEGER
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	}
};