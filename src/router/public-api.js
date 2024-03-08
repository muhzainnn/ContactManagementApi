import express from 'express';
import userController from '../controller/user-controller.js';

export const publicRouter = new express.Router();

/*
 * Endpoint untuk mendaftarkan users baru.
 * Menggunakan fungsi register dari users controller.
 */
publicRouter.post("/users/register", userController.register);

/*
 * Endpoint untuk proses login users.
 * Menggunakan fungsi login dari users controller.
 */
publicRouter.post("/users/login", userController.login);
