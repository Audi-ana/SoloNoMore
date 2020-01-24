if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.NODE_ENV) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      host: "localhost",
      dialect: 'postgres'
    })
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('hikerdb', 'root', null, {
      dialect: "postgres"
    })
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(__dirname + '/user'),
    Hike: sequelize.import(__dirname + '/hike')
    // models 
  }
  global.db.User.hasMany(global.db.Hike)
  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db