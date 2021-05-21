//Modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
require('./models/Pergunta')
const Pergunta = mongoose.model('perguntas')
const usuarios = require('./routes/usuarios')
const passport = require('passport')
require('./config/auth')(passport)
const db = require('./config/db')

//CONFIG
//Sessao
app.use(session({
	secret: 'chavesegura',
	resave: true,
	saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Middleware
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg')
	res.locals.error_msg = req.flash('error_msg')
	res.locals.error = req.flash('error')
	res.locals.user = req.user || null
	next() //para nao quebrar a app
})

//Bodyparser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Handlebars
app.engine('handlebars', handlebars({
	defaultLayout: 'main',
	runtimeOptions: {
	     allowProtoPropertiesByDefault: true,
	     allowProtoMethodsByDefault: true,
	 },
}))
app.set('view engine', 'handlebars')

//Mongoose
mongoose.Promise = global.Promise
mongoose.connect(db.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('MongoDB conectado...')
}).catch((err) => {
	console.log('Erro na conexao com o MongoDB'+err)
})

//Public
app.use(express.static(path.join(__dirname,'public')))

//Rotas
app.get('/', (req, res) => {
	res.render('usuarios/login')
})

app.get('/404', (req, res) => {
	res.send('Erro 404!')
})

app.get('/perguntas', (req, res) => {
	Pergunta.find().then((perguntas) => {
		res.render('perguntas/index', {perguntas: perguntas})
	}).catch((err) => {
		req.flash('error_msg', 'Erro ao listar perguntas!')
		res.redirect('/admin')
	})
})

app.get('/pergunta/:slug', (req, res) => {
	Musica.findOne({slug: req.params.slug}).then((post) => {
		if (post) {
			res.render('post/index', {post: post})
		} else {
			req.flash('error_msg', 'Erro ao listar post')
			res.redirect('/')
		}
	}).catch((erro) => {
		req.flash('error_msg', 'Erro interno')
		res.redirect('/')
	})
})

app.get('/categorias', (req, res) => {
	Artista.find().then((categorias) => {
		res.render('categorias/index', {categorias: categorias})
	}).catch((erro) => {
		req.flash('error_msg', 'Erro ao listar categorias!')
		res.redirect('/')
	})
})

app.get('/categorias/:slug', (req, res) => {
	Artista.findOne({slug: req.params.slug}).then((categoria) => {
		if(categoria) {
			Post.find({categoria: categoria._id}).then((posts) => {
				res.render('categorias/posts', {posts: posts, categoria:categoria})
			})
		} else {
			req.flash('error_msg', 'Erro ao listar posts!')
			res.redirect('/')
		}
	}).catch((erro) => {
		req.flash('error_msg', 'Erro ao listar posts da categoria!')
		res.redirect('/')
	})
})

app.use('/admin', admin)
app.use('/usuarios', usuarios)

//Outros
const PORT = process.env.PORT || 8089
app.listen(PORT, () => {
	console.log('Server running on port '+PORT)
})