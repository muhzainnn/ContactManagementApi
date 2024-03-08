/*
 * @class {ResponseError} - Inisialisasi class untuk respons error.
 */
export class ResponseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    };
};