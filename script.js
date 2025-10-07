// Konfigurasi Supabase Anda (Ganti dengan URL dan Anon Key Anda)
const SUPABASE_URL = 'https://siroce-api.rizq.online/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNzU4MDM4NDAwLAogICAgImV4cCI6IDE5MTU4MDQ4MDAKfQ.jF6erVsb6ppoi8lP6w5FgIFUSk74TJhlAkKf8zA-980';

// Inisialisasi klien Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const contentContainer = document.getElementById('content-container');

// Fungsi untuk mengambil dan menampilkan data
// ... (Kode Supabase dan fetchDataFromSupabase() di bagian atas tetap sama)

// Fungsi untuk mengambil dan menampilkan data
// ... (Bagian atas kode tetap sama)

// Fungsi untuk mengambil dan menampilkan data
async function fetchDataFromSupabase() {
    // ... (Bagian ambil UUID dari URL tetap sama)
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get('uuid');

    if (!uuid) {
        contentContainer.innerHTML = '<p class="error-text">UUID tidak ditemukan di URL.</p>';
        return;
    }

    const { data, error } = await supabaseClient
        .from('Folder')
        .select('*, Box(nama_box)')
        .eq('box_id', uuid);

    if (error) {
        console.error('Error fetching data:', error);
        contentContainer.innerHTML = `<p class="error-text">Gagal memuat data. Mohon coba lagi.</p>`;
        return;
    }

    if (data && data.length > 0) {
        let htmlContent = `
            <h1>List Folder</h1>
            <p><strong>Nama Box:</strong> ${data[0].Box.nama_box}</p>
            <hr class="section-divider">
        `;

        data.forEach(item => {
            htmlContent += `
                <a href="file.html?folder_id=${item.id}" style="text-decoration:none;">
                    <div class="card">
                        <span class="folder-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6H12L10 4Z" fill="#1976d2" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <h3 style="display:inline-block;margin:0;color:#1976d2;font-size:1.15rem;font-weight:600;">Folder ke- ${item.nama_folder}</h3>
                    </div>
                </a>
            `;
        });

        contentContainer.innerHTML = htmlContent;
    } else {
        contentContainer.innerHTML = `<p class="error-text">Data tidak ditemukan.</p>`;
    }
}

// ... (Panggilan fungsi di bagian bawah tetap sama)

// ... (Panggilan fungsi di bagian bawah tetap sama)
document.addEventListener('DOMContentLoaded', fetchDataFromSupabase);