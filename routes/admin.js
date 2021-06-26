const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Post')
const Post = mongoose.model('posts')
const {isAdmin} = require('../helpers/isAdmin')

router.get('/', isAdmin, (req, res) => {
	res.render('admin/index')
})

router.get('/categorias', isAdmin, (req, res) => {
	Categoria.find().sort({date:'desc'}).then((categorias) => {
		res.render('admin/categorias', {categorias: categorias})
	}).catch((err) => {
		req.flash('error_msg', 'Erro ao listar categorias!')
		res.redirect('/admin')
	})
})

router.get('/categorias/add', (req, res) => {
	res.render('admin/add_categoria')
})

router.post('/categorias/nova', isAdmin, (req, res) => {
	//Validation
	var erros = []
	if (!req.body.titulo || req.body.titulo == undefined || req.body.titulo == null) {
		erros.push({texto: 'Título inválido'})
	}

	if (req.body.titulo.length < 2) {
		erros.push({texto: 'Título muito curto'})
	}

	if(erros.length > 0) {
		res.render('admin/add_categoria', {erros: erros})
	} else {

		const novaCategoria = {
			titulo: req.body.titulo,
			slug: req.body.slug
		}
		new Categoria(novaCategoria).save().then(() =>
		{
			req.flash('success_msg', 'Categoria salva com sucesso')
			res.redirect('/admin/categorias')
		}).catch((erro) => {
			req.flash('error_msg', 'Erro ao salvar categoria')
			res.redirect('/admin')
		})
	}
})

router.get('/categorias/edit/:id', isAdmin, (req, res) => {
	Categoria.findOne({_id:req.params.id}).then((categoria) => {
		res.render('admin/edit_categoria', {categoria:categoria})
	}).catch((erro) => {
		req.flash('error_msg', 'Categoria não existe')
		res.redirect('/admin/categorias')
	})
})

router.post('/categorias/edit', isAdmin, (req, res) => {
	//Validacao

	//Editar
	Categoria.findOne({_id: req.body.id}).then((categoria) => {
		categoria.titulo = req.body.titulo
		categoria.slug = req.body.slug

		categoria.save().then(() => {
			req.flash('success_msg', 'Categoria alterada com sucesso')
			res.redirect('/admin/categorias')
		}).catch((erro) => {
			req.flash('error_msg', 'Erro ao salvar a edição')
			res.redirect('/admin/categorias')
		})
	}).catch((erro) => {
		req.flash('error_msg', 'Erro ao editar a categoria')
		res.redirect('/admin/categorias')
	}) 
})

router.post('/categorias/deletar', isAdmin, (req, res) => {
	Categoria.deleteOne({_id: req.body.id}).then(() => {
		req.flash('success_msg', 'Categoria deletada com sucesso')
		res.redirect('/admin/categorias')
	}).catch((erro) => {
		req.flash('error_msg', 'Erro ao deletar Categoria')
		res.redirect('/admin/categorias')
	})
})

router.get('/posts', isAdmin, (req, res) => {

	Post.find().populate('categoria').sort({date:'desc'}).then((posts) => {
		res.render('admin/posts', {posts: posts})
	}).catch((err) => {
		req.flash('error_msg', 'Erro ao listar posts!')
		res.redirect('/admin')
	})
})

router.get('/posts/add', isAdmin, (req, res) => {
	Categoria.find().then((categorias) => {
		res.render('admin/add_post', {categorias: categorias})
	}).catch((erro) => {
		req.flash('error_msg', 'Erro ao carregar o formulário')
		res.redirect('/admin')
	})
})

router.post('/posts/novo', isAdmin, (req, res) => {

	//Validacao
	var erros = []

	if (req.body.categoria == "0") {
		erros.push({texto: "Categoria inválida! Favor verificar a lista de categorias"})
	}

	if(erros.length > 0) {
		res.render('admin/add_post', {erros: erros})
	} else {
		const novoPost = {
			titulo: req.body.titulo,
			descricao: req.body.descricao,
			slug: req.body.slug,
			conteudo: req.body.conteudo,
			categoria: req.body.categoria
		}

		new Post(novoPost).save().then(() => {
			req.flash('success_msg', 'Post criado com sucesso')
			res.redirect('/admin/posts')
		}).catch((err) => {
			req.flash('error_msg', 'Erro ao criar post')
			res.redirect('/admin/posts')
		})
	}
})

router.post('/posts/edit', isAdmin, (req, res) => {
	//Validacao

	//Editar
	Post.findOne({_id: req.body.id}).then((post) => {
		post.titulo = req.body.titulo
		post.descricao = req.body.descricao
		post.slug = req.body.slug
		post.conteudo = req.body.conteudo
		post.categoria = req.body.categoria

		post.save().then(() => {
			req.flash('success_msg', 'Post alterado com sucesso')
			res.redirect('/admin/posts')
		}).catch((erro) => {
			req.flash('error_msg', 'Erro ao salvar a edição')
			res.redirect('/admin/posts')
		})
	}).catch((erro) => {
		req.flash('error_msg', 'Erro ao editar o post')
		res.redirect('/admin/posts')
	}) 
})

router.get('/posts/edit/:id', isAdmin, (req, res) => {
	Post.findOne({_id:req.params.id}).then((post) => {
		Categoria.find().then((categorias) => {
			res.render('admin/edit_post', {categorias: categorias, post: post})
		}).catch((erro) => {
			req.flash('error_msg', 'Erro ao listar categorias')
		})
	}).catch((erro) => {
		req.flash('error_msg', 'Erro ao carregar o form de edição')
		res.redirect('/admin/posts')
	})
})

router.post('/posts/deletar', isAdmin, (req, res) => {
	Post.deleteOne({_id: req.body.id}).then(() => {
		req.flash('success_msg', 'Post deletado com sucesso')
		res.redirect('/admin/posts')
	}).catch((erro) => {
		req.flash('error_msg', 'Erro ao deletar post')
		res.redirect('/admin/posts')
	})
})

module.exports = router