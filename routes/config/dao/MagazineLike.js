/*
 * Created by Administrator on 2018-01-26.
 */
var Sequelize = require('sequelize');

module.exports = {
	info: {
		magazine_idx: {
			type: Sequelize.INTEGER
		},
		user_id: {
			type: Sequelize.STRING(50)
		}
	}
};