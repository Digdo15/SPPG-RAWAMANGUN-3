// Fitur Filter Relawan
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

// Fitur Navigasi Smooth & Active State otomatis saat scroll
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