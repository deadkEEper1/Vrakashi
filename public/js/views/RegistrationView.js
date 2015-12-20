define([
	'text!templates/RegistrationTemplate.html',
	'../models/UserModel',
	'./NavBarView'
	],


	function(RegistrationTemplate, UserModel, NavBarView ) {
		var RegistrationView = Backbone.View.extend({
			el: '#content',

			events: {
				'click #submit'	: 'submit',
				'click #back'	: 'back'
			},

			template: _.template(RegistrationTemplate),

			initialize: function(){
				console.log('RegistrationView inited')
			},

			render: function(){
				this.$el.html(this.template)
			},

			submit: function(){
				var name = $('#name').val()

				var email = $('#email').val()
				var confEmail = $('#confirmEmail').val()

				var pass = $('#password').val()
				var confPass = $('#confirmPassword').val()


				if(email != confEmail){
					alert('Emails are not matchings')
					return
				}

				if(pass != confPass){
					alert('Passwords are not matchings')
					return
				}

				var newUser = new UserModel({
					name: name,
					email: email,
					password: pass
				})
					newUser.save({}, {
						success: function(res, model){
							alert('Welcome to Vrokashi, '+ model.name + ' glad to see you here)')
							Backbone.history.navigate('#myaccount',{trigger: true})
							new NavBarView()
						},

						error: function(err, ss, m){
							alert('User with such email is already exist')
						}
					})
			},

			back: function(){
				Backbone.history.navigate('#', {trigger: true})
			}

		})


		return  RegistrationView

	})
