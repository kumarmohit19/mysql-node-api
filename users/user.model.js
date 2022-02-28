const { DataTypes } = require('sequelize');

const model = (sequelize) => {
   const attributes = {
      email: { 
         type: DataTypes.STRING, 
         allowNull: false 
      },
      password: { 
         type: DataTypes.STRING, 
         allowNull: false 
      },
      username: { 
         type: DataTypes.STRING, 
         allowNull: false 
      },
      firstName: { 
         type: DataTypes.STRING, 
         allowNull: false 
      },
      lastName: { 
         type: DataTypes.STRING, 
         allowNull: false 
      },
      role: { 
         type: DataTypes.STRING, 
         allowNull: false
      }
   }

   const options = {
      defaultScopes: {
         // exclude password hash by default
         attributes: { 
            exclude : ['password'] 
         }
      },
      scopes: {
         // include hash with the scope
         withPassword: {
            exclude : [] 
         }
      }
   }

   return sequelize.define('User', attributes, options)
}

module.exports = model;





module.exports = model;