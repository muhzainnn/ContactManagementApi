import userService from '../service/user-service.js';
import { sendResponse } from './send-response.js';

/*
 * Fungsi register untuk menangani permintaan registrasi users.
 *
 * @variable {result} - Inisialisasi variabel result untuk menyimpan hasil registrasi user dari layanan userService.
 * @fungsi {sendResponse} - Memanggil fungsi sendResponse untuk mengirim tanggapan ke klien dengan status 200 dan data hasil registrasi.
 * @catch {error} - Menangkap error jika terjadi kesalahan selama proses registrasi dan meneruskannya ke middleware error.
 */
const register = async (request, response, next) => {
    try {
        const result = await userService.register(request.body);
        sendResponse(response, 200, result);
    } catch (error) {
        next(error);
    };
};

/*
 * Fungsi login untuk menangani permintaan login users.
 *
 * @variable {result} - Inisialisasi variabel result untuk menyimpan hasil login user dari layanan userService.
 * @fungsi {sendResponse} - Memanggil fungsi sendResponse untuk mengirim tanggapan ke klien dengan status 200 dan data hasil login.
 * @catch {error} - Menangkap error jika terjadi kesalahan selama proses login dan meneruskannya ke middleware error.
 */
const login = async (request, response, next) => {
    try {
        const result = await userService.login(request.body);
        sendResponse(response, 200, result);
    } catch (error) {
        next(error);
    };
};

/*
 * Fungsi get untuk menangani permintaan mendapatkan informasi users.
 *
 * @variable {result} - Inisialisasi variabel result untuk menyimpan hasil, dan mendapatkan informasi user dari layanan userService.
 * @fungsi {sendResponse} - Memanggil fungsi sendResponse untuk mengirim tanggapan ke klien dengan status 200 dan data hasil informasi user.
 * @catch {error} - Menangkap error jika terjadi kesalahan selama proses get dan meneruskannya ke middleware error.
 */
const get = async (request, response, next) => {
    try {
        const result = await userService.get(request.user.username);
        sendResponse(response, 200, result);
    } catch (error) {
        next(error);
    }
};

/*
 * Fungsi update untuk menangani permintaan pembaruan informasi users.
 *
 * @variable {requestBodyUser} - Inisialisasi variabel requestBodyUser untuk mendapatkan data user dari body request, 
 * dan menambahkan username ke data user sebelum memanggil fungsi update.
 * @variable {result} - Inisialisasi variabel result untuk menyimpan hasil pembaruan informasi user dari layanan userService.
 * @fungsi {sendResponse} - Memanggil fungsi sendResponse untuk mengirim tanggapan ke klien dengan status 200 dan data hasil pembaruan informasi user.
 * @catch {error} - Menangkap error jika terjadi kesalahan selama proses update dan meneruskannya ke middleware error.
 */
const update = async (request, response, next) => {
    try {
        const requestBodyUser = request.body;
        requestBodyUser.username = request.user.username;

        const result = await userService.update(requestBodyUser);
        sendResponse(response, 200, result);
    } catch (error) {
        next(error);
    }
};

/*
 * Fungsi logout untuk menangani permintaan logout users.
 *
 * @variable {result} - Inisialisasi variabel result untuk menyimpan hasil logout user dari layanan userService.
 * @fungsi {sendResponse} - Memanggil fungsi sendResponse untuk mengirim tanggapan ke klien dengan status 200 dan data hasil logout user.
 * @catch {error} - Menangkap error jika terjadi kesalahan selama proses update dan meneruskannya ke middleware error.
 */
const logout = async (request, response, next) => {
    try {
        console.info(request.user);
        const result = await userService.logout(request.user.username);
        sendResponse(response, 200, result);
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
    get,
    update,
    logout
};
