define([
	'./models/SessionCheck',
	'./views/EntryPageView',
	'./views/RegistrationView',
	'./views/LogInView',
	'./views/AccountView',
	'./collections/Users',
	'./views/UsersView',
	'./views/UserView',
	'./models/UserModel',
	'./views/AddPostView',
	'./views/NavBarView',
	'./views/PostsView',
	'./models/PostModel',
	'./views/PostView'
	],
	function(SessionCheck, EntryPageView, RegistrationView,
			 LogInView, AccountView, Users, UsersView,UserView,
			 UserModel, AddPostView, NavBarView, PostsView, PostModel, PostView) {
		var Router = Backbone.Router.extend({
		
			routes: {
				''				: 'check',
				'registration'  :  'registration',
				'login'			: 'login',
				'myaccount'		: 'myaccount',
				'users'			: 'users',
				'user/:id'		: 'showUser',
				'newpost'		: 'createNewPost',
				'posts'			: 'posts',
				'post/:id'		: 'showPost'
			},


			initialize: function(){
				console.log('Router inited')
				var that = this

				this.session = new SessionCheck()
				this.session.fetch({
					success: function(){
						new NavBarView() 
					},
					error: function(){

						Backbone.history.navigate('#', {trigger: true})					}
				})

				// var me = new UserModel({
				// 					name: 'Jura',
				// 					email: 'deadkeeper1@gmail.com',
				// 					password: 'gmail',
				// 					admin: true
				// 				})

				// me.save()
			},


			changeView: function(view){
				if(null != this.currentView){
					this.currentView.undelegateEvents()
				}

				this.currentView = view;
				this.currentView.render()

			},

			check: function(){
				this.changeView(new EntryPageView)
			},

			registration: function(){
				this.changeView( new RegistrationView)
			},

			login: function(){
				this.changeView( new LogInView )
			},

			myaccount: function(){
				var self = this

				this.session.fetch({
					success: function(res, user){
						self.changeView( new AccountView({model: user}))
					},

					error: function(err, st){
						alert('You are not loggined')
						Backbone.history.navigate('#', {trigger: true})
					}
				})

			},

			users: function(){
				console.log('Users')
				var that = this;

				var users = new Users
					users.fetch({
						success: function(res, users){
							console.log('Success')
							that.changeView(new UsersView({collection: users}) )
						},

						error: function(res, error){
							alert('Error')
						}
					})
			},


			showUser: function(id){
				var that =  this
				var user = new UserModel({_id: id})
					user.fetch({

						success: function(res, user){
							console.log('Success',user)
							that.changeView(new UserView({model: user}))
						},

						error: function(err, obj){
							alert(obj.responseText)

							Backbone.history.navigate('#users', {trigger: true})
						}
					})
				// this.changeView(new UserView)
			},

			createNewPost: function(){
				this.changeView( new AddPostView)
			},

			posts: function(){
				this.changeView( new PostsView)
			},

			showPost: function(id){
				var that = this;

				var post = new PostModel({_id: id});
					post.fetch({
						success: function(res, post){
							that.changeView( new PostView({model: post}))
						}
					})
			}



		}
	)


		return Router

	})