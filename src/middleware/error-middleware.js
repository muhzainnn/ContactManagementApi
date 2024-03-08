import { ResponseError } from "../error/response-error.js";
import { sendResponse } from '../controller/send-response.js';

/*
 * Middleware untuk menangani kesalahan dalam aplikasi.
 * Jika tidak ada kesalahan, akan melanjutkan ke middleware berikutnya.
 * Jika kesalahan adalah instance dari ResponseError, akan mengirim respons dengan status dan pesan kesalahan yang sesuai.
 * Jika kesalahan bukan instance dari ResponseError, akan mengirim respons kesalahan server internal dengan status 500.
 */
export const errorMiddleware = (error, request, response, next) => {
    if (!error) {
        next();
        return;
    }

    // Menentukan status dan pesan kesalahan berdasarkan apakah kesalahan adalah instance dari ResponseError.
    const status = error instanceof ResponseError ? error.status : 500;
    const errorMessage = error instanceof ResponseError ? error.message : error.message || "Internal Server Error";

    // Menggunakan fungsi sendResponse untuk mengirim respons kesalahan dengan konsistensi.
    sendResponse(response, status, errorMessage);
};