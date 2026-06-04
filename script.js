// =========================================================================
// 1. RECORD DATA MENU BULANAN (Tumpuk terus ke bawah setiap hari)
// =========================================================================
const REKOR_DATA_MENU = [
    {
        tanggal: "2026-06-02", // Menu lampau
        nama: "Nasi Tim Ayam Kampung",
        deskripsi: "Nasi tim lembut dengan potongan ayam kampung, kuah kaldu sayuran kaya vitamin, dan buah pisang.",
        foto: "https://drive.google.com/uc?export=view&id=10gBYPn_VnTzahaNj7jnKkyR1c14qMH8T",
        kalori: "410 Kcal", protein: "18g", karbohidrat: "50g", lemak: "6g"
    },
    {
        tanggal: "2026-06-03", // Menu lampau
        nama: "Kentang Tumbuk & Salmon Panggang",
        deskripsi: "Mashed potato tanpa mentega berlebih, disajikan bersama salmon panggang kaya Omega-3 dan brokoli kukus.",
        foto: "https://drive.google.com/uc?export=view&id=10gBYPn_VnTzahaNj7jnKkyR1c14qMH8T",
        kalori: "480 Kcal", protein: "28g", karbohidrat: "42g", lemak: "12g"
    },
    {
        tanggal: "2026-06-04", // Menu Hari Ini (1)
        nama: "Bubur Manado Sehat",
        deskripsi: "Bubur jagung dan labu kuning kaya serat, disajikan dengan suwiran ayam, kangkung segar, dan tahu rebus.",
        foto: "https://drive.google.com/uc?export=view&id=10gBYPn_VnTzahaNj7jnKkyR1c14qMH8T",
        kalori: "350 Kcal", protein: "15g", karbohidrat: "45g", lemak: "5g"
    },
    {
        tanggal: "2026-06-04", // Menu Hari Ini (2)
        nama: "Nasi Merah & Pepes Ikan Kembung",
        deskripsi: "Nasi merah tinggi serat, pepes ikan kembung, tumis buncis wortel, dan sepotong buah pepaya segar.",
        foto: "https://drive.google.com/uc?export=view&id=10gBYPn_VnTzahaNj7jnKkyR1c14qMH8T",
        kalori: "520 Kcal", protein: "25g", karbohidrat: "60g", lemak: "10g"
    },
    {
        tanggal: "2026-06-05", // Menu Masa Depan
        nama: "Sup Makaroni Bola Daging",
        deskripsi: "Sup bening makaroni dengan bola-bola daging sapi murni rendah lemak, wortel, dan seledri segar.",
        foto: "https://drive.google.com/uc?export=view&id=10gBYPn_VnTzahaNj7jnKkyR1c14qMH8T",
        kalori: "430 Kcal", protein: "22g", karbohidrat: "48g", lemak: "7g"
    }
];

// =========================================================================
// 2. LOGIKA RENDER MENU BERDASARKAN FILTER KALENDER
// =========================================================================
function inisialisasiMenu() {
    const kalenderInput = document.getElementById('input-tanggal-menu');
    if (!kalenderInput) return;

    // 1. Set nilai awal kalender ke tanggal hari ini secara otomatis
    const kini = new Date();
    const tahun = kini.getFullYear();
    const bulan = String(kini.getMonth() + 1).padStart(2, '0');
    const hari = String(kini.getDate()).padStart(2, '0');
    const tanggalHariIni = `${tahun}-${bulan}-${hari}`;
    
    kalenderInput.value = tanggalHariIni;

    // 2. Jalankan fungsi render untuk pertama kali (menampilkan hari ini)
    renderMenu(tanggalHariIni);

    // 3. EVENT LISTENER: Jika user mengubah tanggal di kalender, jalankan ulang renderMenu
    kalenderInput.addEventListener('change', function() {
        renderMenu(this.value);
    });
}

function renderMenu(tanggalTarget) {
    const gridWrapper = document.getElementById('menu-grid-wrapper');
    if (!gridWrapper) return;

    // Saring rekor data berdasarkan tanggal yang dipilih di kalender
    const menuTerfilter = REKOR_DATA_MENU.filter(item => item.tanggal === tanggalTarget);

    let htmlKonten = '';

    if (menuTerfilter.length > 0) {
        menuTerfilter.forEach(item => {
            // Format tampilan tanggal (YYYY-MM-DD menjadi DD/MM/YYYY)
            const pecahTanggal = item.tanggal.split('-');
            const tanggalCetak = `${pecahTanggal[2]}/${pecahTanggal[1]}/${pecahTanggal[0]}`;

            htmlKonten += `
                <div class="menu-card" style="animation: fadeIn 0.5s ease;">
                    <div class="menu-image-container">
                        <img src="${item.foto}" alt="${item.nama}" class="menu-img">
                    </div>
                    <div class="menu-body">
                        <span class="menu-date-tag">📅 ${tanggalCetak}</span>
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
    } else {
        htmlKonten = `<p style="color: #64748b; font-style: italic; grid-column: 1/-1; margin: 20px 0;">
                        Tidak ada rekaman data menu gizi untuk tanggal tersebut.
                      </p>`;
    }

    gridWrapper.innerHTML = htmlKonten;
}

// =========================================================================
// KODE ASLI ANDA (Fungsi Relawan & Scroll Navigasi) - JANGAN DIUBAH
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

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) { current = section.getAttribute('id'); }
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) { a.classList.add('active'); }
    });
});

// Jalankan sistem menu saat halaman siap
document.addEventListener('DOMContentLoaded', inisialisasiMenu);
