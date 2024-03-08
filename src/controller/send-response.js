/*
 * Fungsi untuk mengirim respons JSON dengan mengatur header, status, dan data.
 * 
 * @param {object} response - Objek respons Express.
 * @param {number} status - Kode status HTTP untuk respons.
 * @param {object} data - Data yang akan dimasukkan ke dalam respons JSON.
 */
export const sendResponse = (response, status, data) => {
    let responseData;

    if (status >= 200 && status <= 299) {
        responseData = { status: "OK", code: status, data: data };
    } else {
        responseData = { status: "errors", code: status, errors: data };
    }

    response.set("Content-Type", "application/json").status(status)
    .json(responseData).end();

    // response.set("Content-Type", "application/json").status(status)
    // .json({ status: (status >= 200 && status <= 299) ? "OK" : "errors", code: status, data: data }).end();
};