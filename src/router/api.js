import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import userController from '../controller/user-controller.js';

export const userRouter = new express.Router();

// Menggunakan middleware otentikasi untuk memastikan akses yang diotorisasi.
userRouter.use(authMiddleware);

/*
 * Endpoint untuk mendapatkan informasi users.
 * Menggunakan fungsi get dari user controller.
 */
userRouter.get("/users/getUser", userController.get);

/*
 * Endpoint untuk memperbarui informasi users.
 * Menggunakan fungsi update dari user controller.
 */
userRouter.patch("/users/update", userController.update);

/*
 * Endpoint untuk proses logout users.
 * Menggunakan fungsi logout dari user controller.
 */
userRouter.delete("/users/logout", userController.logout);