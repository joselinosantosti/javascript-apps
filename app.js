//Modulos
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
require('./models/Post')
const Post = mongoose.model('posts')
require('./models/Categoria')
const Categoria = mongoose.model('categorias')
const usuarios = require('./routes/usuarios')
const passport = require('passport')
require('./config/auth')(passport)
const db = require('./config/db')

//CONFIGURACOES
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

//Parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

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
	Post.find().populate('categoria').sort({date:'desc'}).then((posts) => {
		res.render('index', {posts: posts})
	}).catch((erro) => {
		req.flash('error_msg', 'Erro ao listar posts')
		res.redirect('/404')
	})
})

app.get('/404', (req, res) => {
	res.send('Erro 404!')
})

app.get('/posts', (req, res) => {
	res.send('Lista de posts')
})

app.get('/post/:slug', (req, res) => {
	Post.findOne({slug: req.params.slug}).then((post) => {
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
	Categoria.find().then((categorias) => {
		res.render('categorias/index', {categorias: categorias})
	}).catch((erro) => {
		req.flash('error_msg', 'Erro ao listar categorias!')
		res.redirect('/')
	})
})

app.get('/categorias/:slug', (req, res) => {
	Categoria.findOne({slug: req.params.slug}).then((categoria) => {
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
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log('Server running on port '+PORT)
})