var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'remember'
    },
    port: 3000,
    db: 'mysql://root:root@localhost:3306/rememberwhenwe'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'remember'
    },
    port: 3000,
    db: 'mysql://localhost/remember-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'remember'
    },
    port: 80,
    db: 'mysql://localhost/remember-production'
    
  }
};

module.exports = config[env];
