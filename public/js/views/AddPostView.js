define([
		'text!templates/AddPosttemplate.html',
		'../models/SessionCheck',
		'../models/PostModel'
		],


	function(AddPosttemplate, SessionCheck, PostModel) {

		var AddPostView = Backbone.View.extend({

			el: '#content',

			template: _.template(AddPosttemplate),

			events: {
				'click #addPost' : 'addPost'
			},

			initialize: function(){
				this.author = null
				var that = this

				$.ajax({
					async: false,
					url: '/session',
					method: 'get',

					success: function(res){
						that.author = res._id
					}
				})
			},

			render: function(){
				this.$el.html(this.template)
			},


			addPost: function(){
				var title = $('#title').val() 
				var body = $('#body').val()

				var newPost = new PostModel({
					title: title,
					body: body,

					author: this.author
				})

				newPost.save()

				Backbone.history.fragment = '';
				Backbone.history.navigate('#posts', {trigger: true})



			}

		})

		return AddPostView

	})