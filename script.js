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
        .select('*')
        .eq('box_id', uuid);

    if (error) {
        console.error('Error fetching data:', error);
        contentContainer.innerHTML = `<p class="error-text">Gagal memuat data. Mohon coba lagi.</p>`;
        return;
    }

    if (data && data.length > 0) {
        let htmlContent = `
            <h1>List Folder</h1>
            <p><strong>Box Id:</strong> ${data[0].box_id}</p>
            <hr>
        `;

        // Lakukan perulangan untuk setiap item di dalam array data
        data.forEach(item => {
            // Gunakan <a> tag untuk membuat link yang dapat diklik
            htmlContent += `
                <a href="file.html?folder_id=${item.id}">
                    <div>
                        <h3>Folder ID: ${item.id}</h3>
                        <p><strong>Nomor Folder:</strong> ${item.nama_folder}</p>
                    </div>
                </a>
                <hr>
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