define([
		'text!templates/LogInTemplate.html',
		'../models/SessionCheck',
		'./AccountView',
		'./NavBarView'
		],


	function(LogInTemplate, SessionCheck, AccountView, NavBarView) {
		var LogInView = Backbone.View.extend({

			el: '#content',

			template: _.template(LogInTemplate),

			events: {
				'click #submit'	: 'login',
				'click #back'	: 'back'
			},

			initialize: function(){
				console.log('log In View inited')
			},


			render: function(){
				this.$el.html(this.template)

			},

			login : function(){
				console.log('Login attempt')
				var email = $('#email').val()
				var pass = $('#password').val()

				if(!email|| !pass){
					alert('Please, enter email and password!')
					return
				}

				var session = new SessionCheck
					session.save({
						email: email,
						pass: pass
					},
					{
						success: function(res, model){							

                       	    Backbone.history.fragment = '';
							Backbone.history.navigate('#myaccount',{trigger: true})
							alert('Welcome, ' + model.name+'.')

							new NavBarView
						},

						error: function(res, error){
							console.log('error', res, error)
							alert(error.responseText)
						}
					})
			},

			back: function(){
				Backbone.history.navigate('#', {trigger: true})
			}
		})

		return LogInView

	})