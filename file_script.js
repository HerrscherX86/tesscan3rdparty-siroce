// Konfigurasi Supabase Anda (Ganti dengan URL dan Anon Key Anda)
const SUPABASE_URL = 'https://siroce-api.rizq.online/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNzU4MDM4NDAwLAogICAgImV4cCI6IDE5MTU4MDQ4MDAKfQ.jF6erVsb6ppoi8lP6w5FgIFUSk74TJhlAkKf8zA-980';

// Inisialisasi klien Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const fileContainer = document.getElementById('file-container');

// Fungsi untuk mengambil dan menampilkan daftar file
async function fetchFilesFromSupabase() {
    // 1. Ambil ID folder dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const folderId = urlParams.get('folder_id');

    if (!folderId) {
        fileContainer.innerHTML = '<p class="error-text">ID folder tidak ditemukan di URL.</p>';
        return;
    }

    // 2. Ambil data dari Supabase berdasarkan ID folder
    // Asumsikan Anda memiliki tabel 'File' yang memiliki kolom 'folder_id'
    const { data, error } = await supabaseClient
        .from('file') // Ganti dengan nama tabel file Anda
        .select('*')
        .eq('folder_id', folderId);

    if (error) {
        console.error('Error fetching files:', error);
        fileContainer.innerHTML = `<p class="error-text">Gagal memuat file.</p>`;
        return;
    }

    // 3. Tampilkan data ke halaman web
    if (data && data.length > 0) {
        let htmlContent = `
            <h1>Daftar File</h1>
            <p style="color:#666;font-size:0.95rem;margin-bottom:16px;">Menampilkan ${data.length} file dalam folder ini</p>
            <hr class="section-divider">
        `;
        data.forEach((file, index) => {
            htmlContent += `
                <a href="detail.html?file_id=${file.id}" style="text-decoration:none;display:block;">
                    <div class="card" style="animation-delay: ${index * 0.05}s;cursor:pointer;">
                        <div style="display:flex;align-items:start;gap:12px;">
                            <span class="file-icon" style="flex-shrink:0;margin-top:2px;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="#1976d2" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M14 2V8H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                            <div style="flex:1;">
                                <h3 style="margin:0 0 12px 0;color:#1976d2;font-size:1.1rem;font-weight:600;line-height:1.4;">
                                    ${file.uraian || '(Tanpa uraian)'}
                                </h3>
                                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;font-size:0.92rem;">
                                    <p style="margin:0;padding:6px 12px;background:#fff;border-radius:6px;border-left:3px solid #1976d2;">
                                        <strong style="color:#1976d2;">Indeks 1:</strong> <span style="color:#555;">${file.indeks1 || '-'}</span>
                                    </p>
                                    <p style="margin:0;padding:6px 12px;background:#fff;border-radius:6px;border-left:3px solid #1976d2;">
                                        <strong style="color:#1976d2;">Indeks 2:</strong> <span style="color:#555;">${file.indeks2 || '-'}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `;
        });
        fileContainer.innerHTML = htmlContent;
    } else {
        fileContainer.innerHTML = `<p class="error-text">Tidak ada file yang ditemukan untuk folder ini.</p>`;
    }
}

// Panggil fungsi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', fetchFilesFromSupabase);