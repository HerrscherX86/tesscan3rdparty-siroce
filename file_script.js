// Konfigurasi Supabase Anda (Ganti dengan URL dan Anon Key Anda)
const SUPABASE_URL = 'https://vhpuqbmleujbtedyjzew.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocHVxYm1sZXVqYnRlZHlqemV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NDg4MzMsImV4cCI6MjA3MDEyNDgzM30.UNVGrtBEGMWlqZqYEeCRm2BFDH5xDbo3HnfOHYAGJC0';

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
        let htmlContent = `<h1>Daftar File</h1>`;
        
        data.forEach(file => {
            htmlContent += `
                <div>
                    <h3>Uraian: ${file.uraian}</h3>
                    <p>Indeks 1: ${file.indeks1}</p>
                    <p>Indeks 2: ${file.indeks2}</p>
                    
                    
                </div>
                <hr>
            `;
        });

        fileContainer.innerHTML = htmlContent;

    } else {
        fileContainer.innerHTML = `<p class="error-text">Tidak ada file yang ditemukan untuk folder ini.</p>`;
    }
}

// Panggil fungsi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', fetchFilesFromSupabase);