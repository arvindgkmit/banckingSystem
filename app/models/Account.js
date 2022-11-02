module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("accounts", {
      accountNo: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true
      },
      type: {
        type      : Sequelize.ENUM('current', 'saving'),
        allowNull : false,
      },
      amount: {
        type      : Sequelize.INTEGER,
        allowNull : false,
      },
      userId: {
        type      : Sequelize.INTEGER,
        allowNull : false,
        foreignKey: true
      },
    },{
      tableName: false
    });
  
    return Account;
  };