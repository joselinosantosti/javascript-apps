const Sequelize = require('sequelize')

//Conexao Banco
const sequelize = new Sequelize('postit', 'root', 'admin', {
	host: 'localhost',
	dialect: 'mysql'
})

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}