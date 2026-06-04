// =========================================================================
// 1. DATA MANAJEMEN MENU HARIAN (Edit bagian ini saja setiap hari)
// =========================================================================
const DATA_MENU_HARI_INI = [
    {
        waktu: "Pagi", 
        nama: "Bubur Manado Sehat",
        deskripsi: "Bubur jagung dan labu kuning kaya serat, disajikan dengan suwiran ayam, kangkung segar, dan tahu rebus.",
        foto: "https://drive.google.com/uc?export=view&id=10gBYPn_VnTzahaNj7jnKkyR1c14qMH8T",
        kalori: "350 Kcal", protein: "15g", karbohidrat: "45g", lemak: "5g"
    },
    {
        waktu: "Siang",
        nama: "Nasi Merah & Pepes Ikan",
        deskripsi: "Nasi merah, pepes ikan kembung tinggi Omega-3, tumis buncis wortel, dan sepotong buah pepaya segar.",
        foto: "https://drive.google.com/uc?export=view&id=10gBYPn_VnTzahaNj7jnKkyR1c14qMH8T", 
        kalori: "520 Kcal", protein: "25g", karbohidrat: "60g", lemak: "10g"
    },
    {
        waktu: "Malam",
        nama: "Sup Bening Ayam Kampung",
        deskripsi: "Sup bening dengan potongan wortel, kentang, dada ayam, dilengkapi tempe panggang tanpa minyak.",
        foto: "https://drive.google.com/uc?export=view&id=10gBYPn_VnTzahaNj7jnKkyR1c14qMH8T", 
        kalori: "400 Kcal", protein: "20g", karbohidrat: "40g", lemak: "6g"
    }
];

// =========================================================================
// 2. LOGIKA HIGHLIGHT OTOMATIS BERDASARKAN JAM (Jangan diubah-ubah)
// =========================================================================
function renderMenuHarian() {
    const gridWrapper = document.getElementById('menu-grid-wrapper');
    if (!gridWrapper) return;

    // Ambil jam sistem saat ini (0 - 23)
    const jamSekarang = new Date().getHours();
    let waktuAktif = "Pagi";

    // Menentukan menu apa yang harus aktif berdasarkan jam
    if (jamSekarang >= 11 && jamSekarang < 16) {
        waktuAktif = "Siang";
    } else if (jamSekarang >= 16 || jamSekarang < 4) {
        waktuAktif = "Malam";
    } else {
        waktuAktif = "Pagi";
    }

    let htmlKonten = '';

    DATA_MENU_HARI_INI.forEach(item => {
        // Cek apakah menu ini cocok dengan waktu aktif saat ini
        const isHighlight = item.waktu.toLowerCase() === waktuAktif.toLowerCase();
        const statusHighlightClass = isHighlight ? 'highlight' : '';
        const badgeLive = isHighlight ? `<span class="live-badge">🔴 Menu Saat Ini</span>` : '';

        // Deteksi warna tag dasar
        let tagClass = 'tag-pagi';
        if (item.waktu.toLowerCase() === 'siang') tagClass = 'tag-siang';
        if (item.waktu.toLowerCase() === 'malam') tagClass = 'tag-malam';

        htmlKonten += `
            <div class="menu-card ${statusHighlightClass}">
                ${badgeLive}
                <div class="menu-image-container">
                    <img src="${item.foto}" alt="${item.nama}" class="menu-img">
                </div>
                <div class="menu-body">
                    <span class="menu-tag ${tagClass}">Makan ${item.waktu}</span>
                    <h3>${item.nama}</h3>
                    <p>${item.deskripsi}</p>
                    
                    <div class="nutrition-info">
                        <h4>Nilai Gizi:</h4>
                        <div class="nutrition-grid">
                            <div class="nutrition-item">Kalori: <strong>${item.kalori}</strong></div>
                            <div class="nutrition-item">Protein: <strong>${item.protein}</strong></div>
                            <div class="nutrition-item">Karbo: <strong>${item.karbohidrat}</strong></div>
                            <div class="nutrition-item">Lemak: <strong>${item.lemak}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    gridWrapper.innerHTML = htmlKonten;
}

// =========================================================================
// 3. FITUR FILTER RELAWAN (Kode Asli Anda)
// =========================================================================
function filterRelawan(kategori, elementTombol) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    elementTombol.classList.add('active');

    const cards = document.querySelectorAll('.volunteer-card');
    cards.forEach(card => {
        card.style.animation = 'none';
        if (kategori === 'all' || card.getAttribute('data-category') === kategori) {
            card.style.display = 'block';
            setTimeout(() => { card.style.animation = 'fadeIn 0.5s ease'; }, 10);
        } else {
            card.style.display = 'none';
        }
    });
}

// =========================================================================
// 4. FITUR NAVIGASI SMOOTH & ACTIVE STATE (Kode Asli Anda)
// =========================================================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Jalankan fungsi render saat web dimuat
document.addEventListener('DOMContentLoaded', renderMenuHarian);
// =========================================================================
// 3. FITUR FILTER RELAWAN (Kode Asli Anda)
// =========================================================================
function filterRelawan(kategori, elementTombol) {
    // 1. Hapus class 'active' dari semua tombol, lalu tambahkan ke tombol yang diklik
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    elementTombol.classList.add('active');

    // 2. Filter kartu relawan
    const cards = document.querySelectorAll('.volunteer-card');
    cards.forEach(card => {
        // Hapus animasi sebelumnya agar bisa di-trigger ulang
        card.style.animation = 'none';
        
        if (kategori === 'all' || card.getAttribute('data-category') === kategori) {
            card.style.display = 'block';
            
            // Tambahkan timeout kecil untuk memancing reflow (restart animasi)
            setTimeout(() => {
                card.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        } else {
            card.style.display = 'none';
        }
    });
}

// =========================================================================
// 4. FITUR NAVIGASI SMOOTH & ACTIVE STATE (Kode Asli Anda)
// =========================================================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Deteksi posisi layar dikurangi 100px untuk kalibrasi tinggi navbar
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    // Update garis bawah (underline) aktif pada menu navbar
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// =========================================================================
// 5. UTILITAS UNTUK MENJALANKAN FUNGSI SAAT HALAMAN SELESAI DIMUAT
// =========================================================================
document.addEventListener('DOMContentLoaded', renderMenuHarian);
