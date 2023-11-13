// Mengimpor modul Express.js
const express = require('express');

const expressLayouts = require('express-ejs-layouts'); // Mengimpor modul express-ejs-layouts

const { loadContact, findContact } = require('./utils/contacts');

// Menginisialisasi aplikasi Express
const app = express();

// Menentukan port yang akan digunakan
const port = 3000;

// Mengatur EJS sebagai template engine
app.set('view engine', 'ejs');

// built-in middleware
app.use(express.static('public'))

// Menggunakan express-ejs-layouts sebagai middleware
app.use(expressLayouts);

// application level midleware
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

// Menggunakan middleware untuk menyajikan file statis dari direktori saat ini
app.use(express.static(__dirname));

// Penanganan rute untuk halaman utama
app.get('/', (req, res) => {
    res.render('halaman utama', {
        layout: 'layout/main-layout',
        namaWeb: "Rafi'ul Huda",
        title: 'halaman utama',
        // titleh1: 'Halo, ini adalah halaman utama!',
        message: 'Saat ini Saya sedang Mengikuti coding Training backend di sinarmas land'
    });
});

// Penanganan rute untuk halaman about
app.get('/about', (req, res) => {
    res.render('about', { 
        layout: 'layout/main-layout',
        title: "About"
     });
});

// Penanganan rute untuk halaman contact
app.get('/contact', (req, res) => {
    // const contact = [
    //     {
    //         nama: "Rafi'ul Huda",
    //         mobile: "081283288739",
    //         email: "rafiulhuda@gmail.com"
    //     },
    //     {
    //         nama: "Rafiul",
    //         mobile: "081283288789",
    //         email: "rafiul@gmail.com"
    //     },
    //     {
    //         nama: "Raya Adinda Jayadi Ahmad",
    //         mobile: "081283288773",
    //         email: "rayaAdinda01@gmail.com"
    //     }
    // ];
    const contacts = loadContact(); 
    
    // // Memeriksa apakah ada data kontak
    // if (contact.length === 0) {
    //     // Jika tidak ada, menampilkan pesan bahwa belum ada kontak yang tersedia
    //     res.render('contact', {
    //         title: 'Kontak',
    //         message: 'Maaf, Belum ada daftar kontak yang tersedia.'
    //     });
    // } else {
        // Jika ada, menampilkan data kontak di halaman kontak
        res.render('contact', {
            title: 'Kontak',
            contacts,
            layout: 'layout/main-layout',
        });
    }
);
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama); 
    
    // // Memeriksa apakah ada data kontak
    // if (contact.length === 0) {
    //     // Jika tidak ada, menampilkan pesan bahwa belum ada kontak yang tersedia
    //     res.render('detail', {
    //         title: 'Halaman detail kontak',
    //         message: 'Maaf, Belum ada daftar kontak yang tersedia.'
    //     });
    // } else {
        // Jika ada, menampilkan data kontak di halaman kontak
        res.render('detail', {
            title: 'Halaman detail kontak',
            contact,
            layout: 'layout/main-layout',
        });
    }
);

// Penanganan rute dinamis untuk produk dengan parameter 'id' dan query 'category'
app.get('/product/:id', (req, res) => {
    res.send(`Product id: ${req.params.id} <br> Category id: ${req.query.Kategori}`);
});

// Penanganan rute untuk permintaan yang tidak cocok dengan rute lainnya (404 Not Found)
app.use('/', (req, res) => {
    res.status(404);
    res.send('page not found: 404');
});

// Server mendengarkan permintaan pada port yang telah ditentukan
app.listen(port, () => {
    // Pesan ini akan dicetak saat server berjalan
    console.log(`Server berjalan di http://localhost:${port}/`);
});