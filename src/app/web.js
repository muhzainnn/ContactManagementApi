import express from 'express';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { publicRouter } from '../router/open-api.js';
import { userRouter } from '../router/api.js';

export const web = express();

// Menggunakan middleware untuk memproses data JSON.
web.use(express.json());

// Menggunakan router yang menyediakan endpoint-endpoint publik.
web.use(publicRouter);

// Menggunakan router yang menyediakan endpoint-endpoint yang memerlukan otentikasi.
web.use(userRouter);

// Menggunakan middleware untuk menangani kesalahan.
web.use(errorMiddleware);