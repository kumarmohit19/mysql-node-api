const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middlewares/validateRequest');
const Role = require('_helpers/role');
const userService = require('./user.service');

// route funtions

const getAllUsers = (req, res, next) => {
   userService.getAll()
      .then(users => res.json(users))
      .catch(next);
}


const getUserById = (req, res, next) => {
   userService.getById(req.params.id)
      .then(user => res.json(user))
      .catch(next);
}

const addUser = (req, res, next) => {
   userService.create(req.body)
      .then(() => res.json({ message : 'User Created' }))
      .catch(next);
}

const updateUserById = (req, res, next) => {
   userService.update( req.params.id, req.body )
      .then(() => res.json({ message : 'User Updated' }))
      .catch(next);
}

const deleteUserById = (req, res, next) => {
   userService.delete( req.params.id )
      .then(() => res.json({ message : 'User Deleted' }))
      .catch(next);
}

// schema funtions to validate request body
const createSchema = (req, res, next) => {
   const schema = Joi.object({
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      role: Joi.string().valid(Role.Admin, Role.User).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required()
   });

   validateRequest(req, next, schema);
}

const updateSchema = (req, res, next) => {
   const schema = Joi.object({
      username: Joi.string().empty(''),
      firstName: Joi.string().empty(''),
      lastName: Joi.string().empty(''),
      role: Joi.string().valid(Role.Admin, Role.User).empty(''),
      email: Joi.string().email().empty(''),
      password: Joi.string().min(6).empty(''),
      confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
   }).with('password', 'confirmPassword');

   validateRequest(req, next, schema);
}

// routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createSchema, addUser);
router.put('/:id', updateSchema, updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;