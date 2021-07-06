const db = require('./db')

const Anotacao = db.sequelize.define('anotacoes', {
	titulo: {
		type: db.Sequelize.STRING
	},
	texto: {
		type: db.Sequelize.TEXT
	},
})

//Anotacao.sync({force: true})

module.exports = Anotacao