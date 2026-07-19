# PROJECT365

PROJECT365 adalah platform analisis aset digital yang dibangun menggunakan pendekatan SDLC berbasis dokumentasi (Documentation First). Platform ini dirancang agar setiap keputusan bisnis, arsitektur, implementasi, dan pengembangan dapat ditelusuri kembali ke tujuan utama PROJECT365.

Dengan pendekatan ini, PROJECT365 tidak hanya berfokus pada pembuatan fitur, tetapi juga pada kejelasan alasan, batasan, arah, dan dampak dari setiap keputusan. Dokumentasi menjadi fondasi utama agar pengembangan berjalan konsisten, dapat diaudit, dan mudah dilanjutkan secara bertahap.

# Tujuan Folder

Folder ini berisi identitas utama PROJECT365.

Dokumen di dalam folder ini menjadi referensi tertinggi sebelum Business Requirement, Research, maupun Architecture.

Lapisan ini menjelaskan alasan keberadaan PROJECT365, ruang lingkupnya, hal-hal yang tidak menjadi fokus, serta arah jangka panjang yang menjadi dasar bagi seluruh proses SDLC berikutnya.

# Struktur

`vision/` berisi gambaran jangka panjang PROJECT365, termasuk arah besar yang ingin dicapai oleh platform.

`mission/` berisi misi utama PROJECT365 yang menjelaskan cara platform ini memberikan nilai bagi pengguna dan proses pengembangan.

`scope/` berisi batasan ruang lingkup PROJECT365, termasuk area yang termasuk dalam cakupan platform.

`goals/` berisi tujuan utama yang ingin dicapai PROJECT365 sebagai dasar pengambilan keputusan bisnis dan teknis.

`non-goals/` berisi hal-hal yang secara sadar tidak menjadi tujuan PROJECT365 agar fokus pengembangan tetap jelas.

`roadmap/` berisi arah pengembangan jangka panjang yang bersifat bertahap dan dapat berkembang sesuai kebutuhan.

`glossary/` berisi daftar istilah penting yang digunakan dalam dokumentasi PROJECT365 agar pemahaman tetap konsisten.

# Hubungan dengan SDLC

Urutan SDLC PROJECT365 adalah sebagai berikut:

PROJECT365

↓

Business

↓

Research

↓

Architecture

↓

Specifications

↓

Acceptance Criteria

↓

Implementation

↓

Source Code

Setiap layer harus memiliki jejak (traceability) ke layer di atasnya. Artinya, keputusan pada level Business harus dapat ditelusuri ke identitas PROJECT365, keputusan Research harus mendukung kebutuhan Business, dan seterusnya hingga Source Code.

Traceability ini memastikan bahwa implementasi tidak berdiri sendiri, melainkan selalu memiliki dasar yang jelas dari tujuan, kebutuhan, riset, arsitektur, spesifikasi, dan kriteria penerimaan yang telah disepakati.

# Prinsip

- Documentation First.
  Dokumentasi menjadi titik awal sebelum keputusan bisnis, teknis, maupun implementasi dibuat. Setiap perubahan penting harus dijelaskan terlebih dahulu agar dapat dipahami, dievaluasi, dan ditelusuri.

- Business Before Technology.
  Keputusan teknologi harus mengikuti kebutuhan bisnis, bukan sebaliknya. Teknologi dipilih karena mendukung tujuan PROJECT365, bukan karena tren atau preferensi teknis semata.

- Research Before Architecture.
  Arsitektur harus dibangun berdasarkan riset, validasi, dan pemahaman masalah. Pendekatan ini mengurangi asumsi yang tidak teruji sebelum keputusan teknis besar dibuat.

- Architecture Before Implementation.
  Implementasi harus mengikuti arah arsitektur yang telah didefinisikan. Hal ini menjaga konsistensi struktur sistem dan mengurangi risiko perubahan yang tidak terkendali.

- Traceability Across SDLC.
  Setiap artefak dalam SDLC harus dapat ditelusuri ke artefak di layer sebelumnya. Dengan demikian, setiap keputusan memiliki alasan yang jelas dan dapat diaudit.

- AI-Assisted Development with Human Decision.
  AI dapat membantu proses analisis, dokumentasi, dan pengembangan, tetapi keputusan akhir tetap berada pada manusia. Prinsip ini menjaga akuntabilitas dan kesesuaian dengan tujuan PROJECT365.

- Incremental Evolution.
  PROJECT365 dikembangkan secara bertahap melalui peningkatan kecil yang terarah. Setiap langkah harus memperkuat fondasi sebelumnya tanpa mengorbankan stabilitas jangka panjang.

- Vendor Agnostic.
  PROJECT365 tidak boleh bergantung secara berlebihan pada satu vendor, layanan, atau teknologi tertentu. Pendekatan ini menjaga fleksibilitas dan mengurangi risiko ketergantungan jangka panjang.

- Maintainability Over Complexity.
  Solusi yang mudah dipahami dan dirawat lebih diutamakan daripada solusi yang kompleks tanpa kebutuhan yang jelas. Kompleksitas hanya diterima jika memberikan nilai yang sepadan dan terdokumentasi.
