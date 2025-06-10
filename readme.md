# Proyek API EDUSPARK

Sebuah backend API sederhana yang dibuat dengan Express.js untuk aplikasi edukasi game tebak kata. API ini mengelola data game, kata-kata dalam game, kategori, dan papan peringkat (leaderboard).

---

## Fitur Utama

- 📝 Menampilkan daftar semua game beserta kategori dan jumlah pemain.
- 🔠 Menampilkan daftar kata untuk game tertentu.
- 🏆 Menampilkan leaderboard untuk game tertentu.
- 💾 Menyimpan skor baru yang diperoleh pemain ke papan peringkat.

---

## Teknologi yang Digunakan

- **Backend:** Node.js, Express.js
- **ORM:** Sequelize
- **Database:** MySQL / MySQL Compatible (Dites menggunakan [TiDB Cloud](https://tidbcloud.com/))
- **Driver Database:** `mysql2`
- **Environment Variables:** `dotenv`
- **Deployment:** [Vercel](https://vercel.com/)

---

## Instalasi dan Setup

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda.

**1. Clone Repository**
```bash
git clone [URL_REPOSITORY_GIT_ANDA]
cd [NAMA_FOLDER_PROYEK]
```

**2. Install Dependencies**
Gunakan `npm` untuk menginstal semua library yang dibutuhkan.
```bash
npm install
```

**3. Setup Database**
- Buat sebuah database di layanan pilihan Anda (misalnya TiDB Cloud, PlanetScale, atau MySQL lokal).
- Jalankan skrip SQL yang ada di file `database.sql` (atau file sejenis) untuk membuat semua tabel yang diperlukan.

**4. Konfigurasi Environment Variables**
File ini berisi semua kunci rahasia dan konfigurasi untuk terhubung ke database.
- Salin file `.env.example` menjadi file `.env` baru.
  ```bash
  cp .env.example .env
  ```
- Buka file `.env` dan isi semua variabel sesuai dengan konfigurasi database Anda.

---

## Environment Variables (`.env`)

File `.env` dibutuhkan untuk menjalankan aplikasi. Pastikan semua variabel di bawah ini telah diisi dengan benar.

```plaintext
# Konfigurasi Koneksi Database
DB_HOST="host.database.anda.com"
DB_PORT="4000"
DB_NAME="edugame"
DB_USER="username_db"
DB_PASSWORD="password_rahasia_db"
DB_DIALECT="mysql"

# Variabel untuk Sertifikat SSL (WAJIB untuk koneksi ke database cloud)
# Isi dengan seluruh teks dari file ca.pem yang diunduh dari provider database Anda.
DB_SSL_CA_CONTENT="-----BEGIN CERTIFICATE-----\nMIIC...dan seterusnya...\n-----END CERTIFICATE-----"

# Port untuk server lokal
PORT=3000
```

---

## Menjalankan Aplikasi

Untuk menjalankan server secara lokal, gunakan perintah:
```bash
npm start
```
Jika berhasil, Anda akan melihat pesan: `Server berjalan di http://localhost:3000`

---

## Dokumentasi API Endpoints

Berikut adalah daftar API endpoint yang tersedia.

### 1. Mendapatkan Semua Game
- **Method