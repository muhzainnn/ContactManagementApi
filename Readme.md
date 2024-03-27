<p align="center">
  <img src="https://img.icons8.com/color/48/000000/magritte.png"/>
</p>

<h1 align="center">
  System Contact Management RESTful API - v1
</h1>

<p align="left">
  Proyek iterasi pertama dari <a href="https://github.com/zennsketchy" target="_blank">@zennsketchy</a> dibangun dengan teknologi Node.js menggunakan beberapa framework. Bertujuan tidak hanya untuk Membuat RESTful API System Management Contact yang dirancang untuk mendukung tiga fitur utama: User Management, Contact Management, dan Addresses Management. Tetapi, juga sebagai praktik implementasi proyek sederhana yang merupakan hasil dari keterampilan yang telah saya pelajari sebagai junior Software Engineer. Proyek ini sengaja disusun tanpa memimplementasikan aspek-aspek yang kompleks. Proyek ini masih dalam tahap pengembangan, dan beberapa fitur dan perbaikan mungkin akan ditambahkan di masa depan.
</p>


### Features
- **Register User:** 
  Untuk mendaftarkan pengguna baru dengan validasi data seperti username unik dan enkripsi password menggunakan bcrypt.

- **Login User:** 
  Untuk memproses permintaan login pengguna dengan validasi username dan password menggunakan bcrypt.
  
- **Get User:** 
  Untuk mendapatkan informasi pengguna berdasarkan username tertentu.

- **Update User:** 
  Untuk memperbarui informasi pengguna seperti nama dan/atau password, dengan validasi yang sesuai.

- **Logout User:**
  Untuk proses logout pengguna dengan menghapus token otentikasi.


### Technologies Used

- **[Express](https://expressjs.com/) - Version 4.18.2 :** 
  Menggunakan Node.js dan framework Express untuk membangun backend aplikasi.

- **[Prisma](https://www.prisma.io/) - Version 5.10.2 :** 
  Sebagai ORM untuk berinteraksi dengan database MySQL.

- **[Bcrypt](https://www.npmjs.com/package/bcrypt) - Version 5.1.1 :** 
  Untuk enkripsi dan validasi password.

- **[Joi](https://joi.dev/) - Version 17.12.2 :** 
  Library untuk validasi data.

- **[UUID](https://www.npmjs.com/package/uuid) - Version 9.0.1:** 
  Untuk generasi UUID (Universal Unique Identifier).

- **[Winston](https://github.com/winstonjs/winston) - Version 3.11.0:** 
  Library untuk logging.

- **JSON Web Token (JWT):** 
  Untuk mengelola otentikasi pengguna.


### Set-up

1. Install the dependencies

   ```sh
   npm install
   ```

2. Start the development server

   ```sh
   npm start
   ```

3. Running Tests
   ``` sh
   npm test or npx jest ...
   ```

### Folder Structure

```
/src
│── app
│   ├── database.js
│   ├── logging.js
│   └── web.js
│ 
│── controller
│   ├── send-response.js
│   └── user-controller.js
│
│── error
│   └── response-error.js
│
│── middleware
│   ├── auth-middleware.js
│   └── error-middleware.js
│
│── router
│   ├── api.js
│   └── public-api.js
│
│── service
│   └── user-service.js
│
│── validation
│   ├── user-validation.js
│   └── validation.js
│
│── server.js
```
