const bcrypt = require('bcryptjs');
const db = require('_helpers/db')

const getAll = async () => {
   return await db.User.findAll();
} 

const getById = async (id) => {
   return await getUser(id)
}

const create = async (params) => {
   // validate existing user
   if(await db.User.findOne({ where : { email : params.email } })) {
      throw `Email ${ params.email } is already registered`;
   }

   const user = new db.User(params);

   // hash password 
   user.password = await bcrypt.hash(params.password, 10);

   // save user
   await user.save();
}

const update = async ( id, params ) => {
   const user = await getUser(id);
   
   // validate existing username
   const usernameChanged = params.username 
      && user.username !== params.username;
   if(usernameChanged && await db.User.findOne({ where : { username : params.username }})) {
      throw `Username ${ params.username } is already taken`;
   }

   // hash password if it was entered
   if(params.password) {
      params.password = await bcrypt.hash(params.password, 10);
   }

   // copy params to user and save
   Object.assign(user, params);
   user.save();
}

const _delete = async (id) => {
   const user = await getUser(id)
   await user.destroy();
}

// helper function
const getUser = async (id) => {
   const user = await db.User.findByPk(id);
   if(!user) throw 'User Not Found';
   return user;
}

module.exports= { 
   getAll, 
   getById, 
   create, 
   update, 
   delete: _delete 
};