import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { 
    getUserValidation, loginUserValidation, 
    registerUserValidation, updateUserValidation 
} from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

/*
 * Fungsi register untuk menangani registrasi users.
 *
 * @variable {user} - Validasi data user menggunakan skema registrasi dan menginisialisasi variabel user.
 * @variable {countUsers} - Menghitung jumlah user dengan username yang sama di database.
 * @variable {hashedPassword} - Mengenkripsi password user menggunakan bcrypt.
 * @variable {createdUser} - Membuat user baru di database setelah melewati validasi.
 */
const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUsers = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUsers === 1) {
        throw new ResponseError(409, "username already exits");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    });
};

/*
 * Fungsi login untuk menangani permintaan login users.
 *
 * @variable {user} - Validasi data user menggunakan skema login dan menginisialisasi variabel user.
 * @variable {findUser} - Mencari user dengan username yang dikirimkan dan memilih username dan password.
 * @variable {passwordIsValid} - Memvalidasi password yang dikirimkan dengan password yang terenkripsi.
 * @variable {token} - Menghasilkan token baru dan memperbarui token user di database.
 */
const login = async (request) => {
    const user = validate(loginUserValidation, request);

    const findUser = await prismaClient.user.findUnique({
        where: {
            username: user.username
        },
        select : {
            username: true,
            password: true
        }
    });

    if (!findUser) {
        throw new ResponseError(401, "invalid username or password.");
    }

    const passwordIsValid = await bcrypt.compare(user.password, findUser.password);

    if (!passwordIsValid) {
        throw new ResponseError(401, "invalid username or password.");
    }

    const token = uuid().toString();

    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: findUser.username
        },
        select: {
            token: true
        }
    });
};

/*
 * Fungsi get untuk menangani permintaan mendapatkan informasi users.
 *
 * @variable {user} - Validasi data user menggunakan skema get user dan menginisialisasi variabel user.
 * @variable {findUser} - Mencari user dengan username tertentu dan memilih username dan nama.
 */
const get = async (requestUsername) => {
    const user = await validate(getUserValidation, requestUsername);

    const findUser = await prismaClient.user.findUnique({
        where: {
            username: user
        },
        select: {
            username: true,
            name: true
        }
    });

    if (!findUser) {
        throw new ResponseError(404, "user is not found");
    }

    return findUser;
};

/*
 * Fungsi update untuk menangani permintaan pembaruan informasi users.
 *
 * @variable {user} - Validasi data user menggunakan skema update user dan menginisialisasi variabel user.
 * @variable {countUser} - Memeriksa apakah user dengan username tertentu ada.
 * @variable {dataUser} - Menyiapkan data untuk diupdate berdasarkan informasi user yang diberikan.
 * @variable {updateUser} - Memperbarui data user di database.
 */
const update = async (requestUsername) => {
    const user = validate(updateUserValidation, requestUsername);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser !== 1) {
        throw new ResponseError(404, "User not found");
    }

    const dataUser = {};

    if (user.name) {
        dataUser.name = user.name;
    }

    if (user.password) {
        dataUser.password = await bcrypt.hash(user.password, 10);
    }

    const updateUser = await prismaClient.user.update({
        where: {
            username: user.username
        },
        data: dataUser,
        select: {
            username: true,
            name: true
        }
    });

    return updateUser;
};

/*
 * Fungsi logout untuk menangani permintaan logout users.
 *
 * @variable {user} - Validasi data user menggunakan skema get user dan menginisialisasi variabel user.
 * @variable {findUser} - Mencari user dengan username tertentu.
 * @variable {updatedUser} - Memperbarui data user di database dengan menghapus token.
 */
const logout = async (requestUsername) => {
    const user = validate(getUserValidation, requestUsername);

    console.info(user);

    const findUser = await prismaClient.user.findUnique({
        where: {
            username: user
        }
    });

    if (!findUser) {
        throw new ResponseError(404, "user not found");
    }

    return prismaClient.user.update({
        where: {
            username: user
        },
        data: {
            token: null
        },
        select : {
            username: true
        }
    });
};

export default {
    register,
    login,
    get,
    update,
    logout
}
