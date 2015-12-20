define([
	'text!templates/NavBarTemplate.html',
	'../models/SessionCheck',
	'../collections/Users'
	],


	function(NavBarTemplate, SessionCheck, Users) {
		var NavBarView = Backbone.View.extend({

			el: '#navBar',

			template: _.template(NavBarTemplate),

			events:{
				'click #logOut': 'logOut',
				'click #users': 'users',
				'click #posts': 'posts',
				'click #myAccount' : 'myAccount'
			},

			initialize: function(){
				console.log('NavBarView inited')
				this.render()
			},

			render: function(){
				this.$el.html(this.template)
				console.log('rendered')
			},

			logOut: function(){
				console.log('logOut')
				this.undelegateEvents()


				$.ajax({
					url: '/session',
					method: 'delete',
					sync: true
				})

				this.undelegateEvents()
				$('#navBar').hide()
				Backbone.history.navigate('#',{trigger: true})


				

			},

			users: function(){
				Backbone.history.navigate('#users', {trigger:true})			
			},

			posts: function(){
				Backbone.history.fragment = ''
				Backbone.history.navigate('#posts', {trigger:true})		
			},

			myAccount: function(){

				Backbone.history.fragment = ''
				Backbone.history.navigate('#myaccount', {trigger:true})
			}
		})

		return NavBarView

	})
