define([
		'text!templates/EntryPageTemplate.html',
		],


	function(EntryPageTemplate) {
		var EntryPageView = Backbone.View.extend({

			el: '#content',

			template: _.template(EntryPageTemplate),

			events: {
				'click #logIn'	: 'logIn',
				'click #registrate'	: 'signIn'
			},

			initialize: function(){
				console.log('EntryPageView inited')
				return this
			},


			render: function(){
				this.$el.html(this.template)

			},

			signIn: function(){
				console.log('Registrate')
				Backbone.history.navigate('#registration', {trigger:true})
			},

			logIn: function(){
				console.log('Log In')
				Backbone.history.navigate('#login', {trigger:true})
			}


		})

		return EntryPageView

	})