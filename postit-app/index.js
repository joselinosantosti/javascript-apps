const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Anotacao = require('./models/Anotacao')

//Config
	//Templte Engine
	app.engine('handlebars', handlebars({defaultLayout: 'main'}))
	app.set('view engine', 	'handlebars')

	//Body parser
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.json())

//Rotas
app.get('/cadastro', function(req, res) {
	res.render('cadastro')
})

app.get('/', function(req, res) {
	Anotacao.findAll({order: [['id', 'DESC']]}).then(function(anotacoes) {
		console.log(anotacoes)
		res.render('home', {anotacoes:anotacoes})
	})
})

//Cadastrar anotacao
app.get('/nova_anotacao', function(req, res) {
	res.render('form_anotacao')
})

app.post('/registrar', function(req, res) {
	Anotacao.create( {
		titulo: req.body.titulo,
		texto: req.body.texto,
	}).then(function() {
		//res.send('Anotacao criado com sucesso!')
		res.redirect('/')
	}).catch(function(erro){
		res.send('Erro ao criar Anotação. Erro: '+erro)
	})
})

app.get('/deletar/:id', function(req, res) {
	Anotacao.destroy({where: {'id': req.params.id}}).then(function() {
		//res.send('Anotação deletada com sucesso')
		res.redirect('/')
	}).catch(function() {
		res.send('Erro ao deletar Anotação. Erro: '+erro)
	})
})

app.listen(8081, function() {
	console.log('Running')
})
