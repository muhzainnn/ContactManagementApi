import { prismaClient } from "../app/database.js";
import { sendResponse } from '../controller/send-response.js'; 

/*
 * Middleware otentikasi untuk memastikan bahwa user memiliki token valid.
 * Jika tidak ada token dalam header Authorization, maka respons 401 Unauthorized akan dikirimkan.
 * Jika token tidak valid atau tidak ditemukan di database, juga akan mengirim respons 401 Unauthorized.
 * Jika token valid, data pengguna akan ditambahkan ke objek request sebagai request.user dan melanjutkan ke middleware berikutnya.
 */
export const authMiddleware = async (request, response, next) => {
    const getTokenByHeader = request.get("Authorization");

    const acceptedType = request.get("Accept");

    if (!getTokenByHeader || acceptedType !== "applications/json") {
        sendResponse(response, 401, "Unauthorized. Only application/json is supported.");
        return;
    }

    const findUserByToken = await prismaClient.user.findFirst({ 
        where: {
            token: getTokenByHeader
        }
    });

    if (!findUserByToken) {
        sendResponse(response, 401, "Unauthorized: Invalid or missing token");
        return;
    }

    request.user = findUserByToken;
    next();
};