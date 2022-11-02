module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true
      },
      name: {
        type      : Sequelize.STRING,
        allowNull : false
      },
      email: {
        type      : Sequelize.STRING,
        isUnique  : true,
        allowNull : false,
  
        validate:{
            isEmail : true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },{
      tableName: false
    });
  
    return User;
  };