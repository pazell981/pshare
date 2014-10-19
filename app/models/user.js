var User = sequelize.define('users', {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
  	tableName: 'my_user_table',
  	timestamps: true,
  	updatedAt: 'updated_at',
 	 	createdAt: 'created_at'
	},
    instanceMethods: {
	    retrieveAll: function(onSuccess, onError) {
				User.findAll({}, {raw: true})
					.success(onSuccess).error(onError);	
		  },
	    retrieveById: function(user_id, onSuccess, onError) {
				User.find({where: {id: user_id}}, {raw: true})
					.success(onSuccess).error(onError);	
		  },
	    add: function(onSuccess, onError) {
				var username = this.username;
				var firstname = this.firstname;
				var lastname = this.lastname;
				var password = this.password;
				var shasum = crypto.createHash('sha1');
				shasum.update(password);
				password = shasum.digest('hex');
			
				User.build({ 
					username: username,
					firstname: firstname,
					lastname: lastname, 
					password: password 
				}).save().success(onSuccess).error(onError);
		  },
		  updateById: function(user_id, onSuccess, onError) {
			var id = user_id;
			var username = this.username;
			var password = this.password;
			
			var shasum = crypto.createHash('sha1');
			shasum.update(password);
			password = shasum.digest('hex');
						
			User.update({ username: username,password: password},{ id: id })
				.success(onSuccess).error(onError);
		   },
	      removeById: function(user_id, onSuccess, onError) {
			User.destroy({id: user_id}).success(onSuccess).error(onError);	
		  }
		  generateHash = function(password) {
		      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
		  };
			validPassword = function(password) {
		      return bcrypt.compareSync(password, this.local.password);
		  };
    }
}); 