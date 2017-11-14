module.exports = function(sequelize, DataTypes){
    let User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                len: [1]
            }
        },
        email:{
            type: DataTypes.STRING, 
            allowNull:false
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull:false
        }         
    })

    return User;
};