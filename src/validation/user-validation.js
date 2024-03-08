import Joi from 'joi';

// Skema validasi untuk proses registrasi user.
const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
});

// Skema validasi untuk proses login user.
const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

// Skema validasi untuk proses get user.
const getUserValidation = Joi.string().max(100).required();

// Skema validasi untuk proses update user.
const updateUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).optional(),
    name: Joi.string().max(100).optional()
});

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}
