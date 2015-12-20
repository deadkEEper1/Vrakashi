define([
	'text!templates/postsTemplate.html',
	'../collections/Posts'
	],


	function(PostsTemplate, Posts) {
		var PostsView = Backbone.View.extend({
			el: '#content',

			events:{
				'click' : 'read_post'
			},

			template: _.template(PostsTemplate),

			initialize: function(){
				var that = this
				var posts = new Posts
					posts.fetch({
						async: false,

						success: function(res, models){
							that.collection = models
						},

						error: function(){
							console.log('')
						}
					})

			},

			render: function(){
				this.$el.html(this.template(this.collection))
			},



			read_post : function(e){
				
					var targetEl = $(e.target);
					var div = targetEl.closest('div');
					var id = div.attr('id');


					Backbone.history.fragment = '';
					Backbone.history.navigate('#post/'+id, {trigger: true})


			}

		})
		return PostsView

	})
