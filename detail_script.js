// Konfigurasi Supabase Anda (Ganti dengan URL dan Anon Key Anda)
const SUPABASE_URL = 'https://siroce-api.rizq.online/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNzU4MDM4NDAwLAogICAgImV4cCI6IDE5MTU4MDQ4MDAKfQ.jF6erVsb6ppoi8lP6w5FgIFUSk74TJhlAkKf8zA-980';

// Inisialisasi klien Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const detailContainer = document.getElementById('detail-container');

// Fungsi untuk mengambil dan menampilkan detail file
async function fetchFileDetail() {
    // 1. Ambil ID file dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const fileId = urlParams.get('file_id');

    if (!fileId) {
        detailContainer.innerHTML = '<p class="error-text">ID file tidak ditemukan di URL.</p>';
        return;
    }

    // 2. Ambil data dari Supabase berdasarkan ID file
    const { data, error } = await supabaseClient
        .from('file')
        .select('*')
        .eq('id', fileId)
        .single();

    if (error) {
        console.error('Error fetching file detail:', error);
        detailContainer.innerHTML = `<p class="error-text">Gagal memuat detail file.</p>`;
        return;
    }

    // 3. Tampilkan detail file ke halaman web
    if (data) {
        let htmlContent = `
            <div style="display:flex;align-items:center;margin-bottom:16px;">
                <span class="file-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="#1976d2" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 2V8H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <h1 style="margin:0;flex:1;">${data.uraian || '(Tanpa uraian)'}</h1>
            </div>
            <hr class="section-divider">
            
            <div class="detail-card">
                <h3 style="margin:0 0 16px 0;color:#1976d2;font-size:1.2rem;">Informasi Dasar</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Kode Klasifikasi</label>
                        <div class="value">${data.kode_klasifikasi || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>No Item</label>
                        <div class="value">${data.no_item || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Indeks 1</label>
                        <div class="value">${data.indeks1 || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Indeks 2</label>
                        <div class="value">${data.indeks2 || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Kurun Waktu</label>
                        <div class="value">${data.kurun_waktu || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Tanggal Terima</label>
                        <div class="value">${data.tgl_terima ? new Date(data.tgl_terima).toLocaleDateString('id-ID') : '-'}</div>
                    </div>
                </div>
            </div>

            <div class="detail-card">
                <h3 style="margin:0 0 16px 0;color:#1976d2;font-size:1.2rem;">Informasi Arsip</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Tingkat Pertimbangan</label>
                        <div class="value">${data.tingkat_pertimbangan || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Jumlah Halaman</label>
                        <div class="value">${data.jumlah_halaman || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Retensi Arsip Aktif</label>
                        <div class="value">${data.retensi_arsip_aktif || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Retensi Arsip Inaktif</label>
                        <div class="value">${data.retensi_arsip_inaktif || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Nasib Akhir Arsip</label>
                        <div class="value">${data.nasib_akhir_arsip || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Klasifikasi Keamanan</label>
                        <div class="value">${data.klasifikasi_keamanan || '-'}</div>
                    </div>
                </div>
            </div>

            <div class="detail-card">
                <h3 style="margin:0 0 16px 0;color:#1976d2;font-size:1.2rem;">Informasi Keuangan</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>No SPM</label>
                        <div class="value">${data.no_spm || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>No SP2D</label>
                        <div class="value">${data.no_sp2d || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Jenis SPM</label>
                        <div class="value">${data.jenis_spm || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Nilai SP2D</label>
                        <div class="value">${data.nilai_sp2d || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Realisasi Anggaran</label>
                        <div class="value">${data.realisasi_anggaran || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Unit Pengolah Arsip</label>
                        <div class="value">${data.unit_pengolah_arsip || '-'}</div>
                    </div>
                </div>
            </div>

            <div class="detail-card">
                <h3 style="margin:0 0 16px 0;color:#1976d2;font-size:1.2rem;">Informasi Tambahan</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>Status</label>
                        <div class="value">${data.status || '-'}</div>
                    </div>
                    <div class="detail-item">
                        <label>Jenis Rak</label>
                        <div class="value">${data.jenis_rak || '-'}</div>
                    </div>
                    <div class="detail-item" style="grid-column: 1 / -1;">
                        <label>Keterangan</label>
                        <div class="value">${data.keterangan || '-'}</div>
                    </div>
                </div>
            </div>
        `;

        detailContainer.innerHTML = htmlContent;
        
        // Load PDF if file_url exists and is a PDF
        if (data.file_url && data.file_url.toLowerCase().includes('.pdf')) {
            loadPdfViewer(data.file_url);
        }
    } else {
        detailContainer.innerHTML = `<p class="error-text">File tidak ditemukan.</p>`;
    }
}

// Global variables for PDF viewer
let currentPdfScale = 1.2;
let currentPdf = null;

// Function to load and display PDF
async function loadPdfViewer(pdfUrl) {
    const pdfContainer = document.getElementById('pdf-viewer-container');
    const pdfContent = document.getElementById('pdf-viewer-content');
    
    // Show PDF viewer container
    pdfContainer.style.display = 'block';
    
    // Check if PDF.js is loaded
    if (typeof pdfjsLib === 'undefined') {
        pdfContent.innerHTML = `
            <div class="error-text">
                PDF.js library tidak dimuat dengan benar.<br>
                <small>Pastikan file pdfjs/pdf.min.js tersedia.</small><br><br>
                <a href="${pdfUrl}" target="_blank" style="color:#1976d2;">
                    🔗 Buka PDF di tab baru
                </a>
            </div>
        `;
        return;
    }
    
    try {
        console.log('Attempting to load PDF:', pdfUrl);
        
        // Configure PDF.js worker (if not already configured)
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs/pdf.worker.min.js';
        }
        
        // First, let's try to fetch the URL to check if it's accessible
        try {
            const response = await fetch(pdfUrl, { 
                method: 'HEAD',
                mode: 'no-cors' 
            });
            console.log('PDF URL response:', response);
        } catch (fetchError) {
            console.log('Fetch test failed (this might be normal due to CORS):', fetchError);
        }
        
        // Configure PDF.js with CORS settings
        const loadingTask = pdfjsLib.getDocument({
            url: pdfUrl,
            disableStream: true,
            disableAutoFetch: true,
            httpHeaders: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        
        // Add progress tracking
        loadingTask.onProgress = function(progress) {
            if (progress.total > 0) {
                const percent = Math.round((progress.loaded / progress.total) * 100);
                pdfContent.innerHTML = `<div class="pdf-loading">Memuat PDF... ${percent}%</div>`;
            }
        };
        
        currentPdf = await loadingTask.promise;
        console.log('PDF loaded successfully. Pages:', currentPdf.numPages);
        
        // Clear loading message
        pdfContent.innerHTML = '';
        
        // Render all pages
        for (let pageNum = 1; pageNum <= currentPdf.numPages; pageNum++) {
            await renderPdfPage(pageNum);
        }
        
        // Update zoom level display
        updateZoomDisplay();
        
    } catch (error) {
        console.error('Error loading PDF:', error);
        let errorMessage = 'Gagal memuat PDF. ';
        
        if (error.name === 'InvalidPDFException') {
            errorMessage += 'File bukan PDF yang valid.';
        } else if (error.name === 'MissingPDFException') {
            errorMessage += 'File PDF tidak ditemukan.';
        } else if (error.name === 'UnexpectedResponseException') {
            errorMessage += 'Server menolak akses ke file PDF.';
        } else if (error.message && error.message.includes('CORS')) {
            errorMessage += 'File PDF diblokir oleh kebijakan CORS.';
        } else if (error.message && error.message.includes('NetworkError')) {
            errorMessage += 'Tidak dapat mengakses file PDF (masalah jaringan).';
        } else {
            errorMessage += `Error: ${error.message || 'Unknown error'}`;
        }
        
        pdfContent.innerHTML = `
            <div class="error-text">
                ${errorMessage}<br><br>
                <small style="color:#666;">
                    URL: ${pdfUrl}<br>
                    Debug info: ${error.name || 'Unknown'} - ${error.message || 'No message'}
                </small>
                <br><br>
                <a href="${pdfUrl}" target="_blank" style="color:#1976d2;">
                    🔗 Coba buka PDF di tab baru
                </a>
            </div>
        `;
    }
}

// Function to render a single PDF page
async function renderPdfPage(pageNum) {
    const page = await currentPdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: currentPdfScale });
    
    // Create page container
    const pageDiv = document.createElement('div');
    pageDiv.className = 'pdf-page';
    pageDiv.id = `pdf-page-${pageNum}`;
    
    // Add page number header
    const pageHeader = document.createElement('div');
    pageHeader.className = 'page-number';
    pageHeader.textContent = `Halaman ${pageNum} dari ${currentPdf.numPages}`;
    pageDiv.appendChild(pageHeader);
    
    // Create canvas for PDF rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    pageDiv.appendChild(canvas);
    document.getElementById('pdf-viewer-content').appendChild(pageDiv);
    
    // Render PDF page into canvas context
    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    
    await page.render(renderContext).promise;
}

// Function to change PDF zoom level
function changePdfZoom(delta) {
    currentPdfScale += delta;
    
    // Limit zoom between 0.5x and 3x
    if (currentPdfScale < 0.5) currentPdfScale = 0.5;
    if (currentPdfScale > 3) currentPdfScale = 3;
    
    // Re-render all pages with new scale
    if (currentPdf) {
        const pdfContent = document.getElementById('pdf-viewer-content');
        pdfContent.innerHTML = '<div class="pdf-loading">Memuat ulang dengan zoom baru...</div>';
        
        setTimeout(async () => {
            pdfContent.innerHTML = '';
            for (let pageNum = 1; pageNum <= currentPdf.numPages; pageNum++) {
                await renderPdfPage(pageNum);
            }
        }, 100);
    }
    
    updateZoomDisplay();
}

// Function to update zoom level display
function updateZoomDisplay() {
    const zoomDisplay = document.getElementById('zoom-level');
    if (zoomDisplay) {
        zoomDisplay.textContent = Math.round(currentPdfScale * 100) + '%';
    }
}

// Panggil fungsi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', fetchFileDetail);