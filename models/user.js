module.exports = function(sequelize, DataTypes){
    let User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique:true,
            validate: {
                len:[2, 10]
            }
        },        
        email:{
            type: DataTypes.STRING, 
            allowNull:false,
            unique:true
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull:false, 
            validate: {
                len:[2, 10]
            }
        }       
    });

    return User;
};