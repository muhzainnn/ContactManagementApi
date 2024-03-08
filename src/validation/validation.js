import { ResponseError } from '../error/response-error.js';

/*
 * Fungsi untuk melakukan validasi menggunakan skema Joi.
 * Jika terjadi kesalahan validasi, akan ResponseError dengan kode status 400.
 * 
 * @param {object} schema - Skema Joi untuk validasi.
 * @param {object} request - Objek yang akan divalidasi.
 * @returns {object} - Objek yang telah divalidasi.
 */
export const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    });

    if (result.error) {
        throw new ResponseError(400, "Validation Errors");
    } else {
        return result.value;
    }
};
