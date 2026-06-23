# Instruksi Implementasi — App Shell + Mini Dashboard (Home Overview)
## SentinelRisk PNM — update dari rencana App Shell sebelumnya

**Konteks:** Dokumen ini MENGGANTIKAN bagian Dashboard placeholder ("Coming Soon") dari instruksi App Shell sebelumnya. Struktur Sidebar, UserProvider/mockUser, dan routing restructure `(app)/` yang sudah direncanakan/dikerjakan sebelumnya TETAP DIPAKAI — yang berubah hanya isi halaman `/dashboard`, dari placeholder kosong menjadi Mini Dashboard sesuai desain Stitch yang sudah jadi (lihat screenshot terlampir).

**Penting soal istilah:** Halaman ini disebut "Mini Dashboard" atau "Dashboard Overview" — BUKAN "Full Dashboard". Full Dashboard adalah halaman terpisah yang sudah didesain di Stitch juga, dan akan dibangun di langkah berikutnya setelah ini selesai. Tombol "View Full Dashboard" di halaman ini untuk SEKARANG hanya menampilkan notifikasi "Coming Soon" (lihat bagian 5), belum benar-benar navigasi ke Full Dashboard meskipun route-nya nanti akan ada.

---

## 1. Struktur data dummy — rancang untuk kompatibel dengan import nanti

Ini bagian paling penting secara arsitektur. Buat file baru `lib/data/risk-register.ts` yang berisi **interface/type** dan **10 data dummy**. Struktur type ini harus dirancang mengantisipasi bahwa nanti data akan datang dari hasil import file Risk Register (Excel/CSV) lewat modul "Import Risk Register" — jadi field-nya harus mencakup semua kolom yang relevan, bahkan kalau belum semua dipakai di Mini Dashboard ini.

```ts
export type RiskStatus = "Draft" | "Submitted" | "Reviewed" | "Approved" | "Rejected";
export type RiskRating = "Low" | "Medium" | "High" | "Very High";

export interface RiskRegisterEntry {
  id: string;              // contoh: "R-2024-001"
  riskSubject: string;     // contoh: "Data Breach via Unsecured API Endpoints"
  status: RiskStatus;
  inherentRiskRating: RiskRating;
  lastUpdated: string;     // format ISO date string, contoh: "2024-10-12"
}

export const mockRiskRegister: RiskRegisterEntry[] = [
  {
    id: "R-2024-001",
    riskSubject: "Data Breach via Unsecured API Endpoints",
    status: "Reviewed",
    inherentRiskRating: "Very High",
    lastUpdated: "2024-10-12",
  },
  {
    id: "R-2024-002",
    riskSubject: "Insider Threat: Unauthorized Access to Vault",
    status: "Draft",
    inherentRiskRating: "High",
    lastUpdated: "2024-10-14",
  },
  {
    id: "R-2024-003",
    riskSubject: "Unauthorized access to core banking systems",
    status: "Approved",
    inherentRiskRating: "Very High",
    lastUpdated: "2024-10-15",
  },
  {
    id: "R-2024-004",
    riskSubject: "Data loss due to insufficient cloud backup",
    status: "Reviewed",
    inherentRiskRating: "High",
    lastUpdated: "2024-10-16",
  },
  {
    id: "R-2024-005",
    riskSubject: "Excessive privilege assignments on LoanSys",
    status: "Draft",
    inherentRiskRating: "Medium",
    lastUpdated: "2024-10-17",
  },
  {
    id: "R-2024-006",
    riskSubject: "Phishing vulnerability in HR portal",
    status: "Reviewed",
    inherentRiskRating: "High",
    lastUpdated: "2024-10-18",
  },
  {
    id: "R-2024-007",
    riskSubject: "Unpatched legacy server in Branch 04",
    status: "Approved",
    inherentRiskRating: "Very High",
    lastUpdated: "2024-10-19",
  },
  {
    id: "R-2024-008",
    riskSubject: "Insecure Wi-Fi configuration at HQ",
    status: "Draft",
    inherentRiskRating: "Medium",
    lastUpdated: "2024-10-20",
  },
  {
    id: "R-2024-009",
    riskSubject: "Lack of MFA for external contractors",
    status: "Reviewed",
    inherentRiskRating: "High",
    lastUpdated: "2024-10-21",
  },
  {
    id: "R-2024-010",
    riskSubject: "Inadequate physical security at Data Center",
    status: "Approved",
    inherentRiskRating: "Low",
    lastUpdated: "2024-10-22",
  },
];
```

**Kenapa strukturnya begini:** field `status` dan `inherentRiskRating` dibuat sebagai union type literal (bukan `string` bebas), supaya nanti kalau ada fungsi import dari file Excel, hasil parsing-nya bisa divalidasi/dipetakan ke union type ini — mencegah data sampah seperti typo status masuk ke sistem. Ini juga memudahkan styling badge nanti (lihat bagian 4), karena TypeScript akan memastikan hanya 5 kemungkinan status dan 4 kemungkinan rating yang valid.

**Catatan untuk pengembangan nanti (tidak perlu dikerjakan sekarang):** saat modul Import Risk Register sungguhan dibangun, fungsi importnya akan menghasilkan array `RiskRegisterEntry[]` dengan shape yang sama persis seperti ini, lalu disimpan menggantikan atau menambah ke `mockRiskRegister`. Karena komponen Mini Dashboard nanti akan membaca dari import `{ mockRiskRegister }` ini, mengganti sumber data nanti (dari mock ke hasil import asli, atau ke API) hanya perlu mengubah file ini saja, tidak perlu mengubah komponen UI.

---

## 2. KPI Summary — 4 angka ringkasan

Empat card ini ("Active Risks", "Control Efficacy", "Approvals", "Compliance") di desain Stitch nilainya statis besar (124, 92%, 03, 100%) — untuk konsistensi dengan prinsip "data dummy yang realistis dan bisa diturunkan dari data sungguhan nanti", buat sebagai konstanta terpisah di file yang sama (`lib/data/risk-register.ts`):

```ts
export const mockKpiSummary = {
  activeRisks: { value: 124, trend: "+8%", trendDirection: "up" as const },
  controlEfficacy: { value: "92%", label: "Stable" },
  approvals: { value: 3, label: "High", urgency: "high" as const },
  compliance: { value: "100%", label: "Audit Ready" },
};
```

Catatan: untuk tahap ini, angka-angka KPI ini TIDAK perlu dihitung otomatis dari `mockRiskRegister` (misalnya `activeRisks` tidak perlu benar-benar `mockRiskRegister.length`, karena datanya nanti akan jauh lebih banyak dari 10 dummy ini begitu Risk Register modul sungguhan jalan). Biarkan sebagai angka statis terpisah dulu.

---

## 3. Layout halaman Mini Dashboard

Halaman ini menggantikan isi `app/(app)/dashboard/page.tsx` yang sebelumnya cuma "Coming Soon". Struktur sesuai desain Stitch:

**Bagian welcome/hero** (card besar di kiri atas):
* Heading: "Welcome back, {nama user}." — ambil nama dari `useCurrentUser()` yang sudah dibuat di langkah App Shell sebelumnya, JANGAN hardcode "Ananda" di komponen ini
* Body text: deskripsi progress assessment (boleh tetap statis/dummy seperti di desain: "Your risk assessment cycle is currently 74% complete...")
* Dua tombol: "Continue Assessment" (primary, warna deep blue) dan "View Reports" (secondary, outline)
* Elemen ilustrasi shield di sisi kanan card (boleh pakai ikon dari lucide-react, cari ikon shield yang sesuai, beri opacity rendah sebagai elemen dekoratif)

**4 KPI cards** (grid 2x2 di sisi kanan hero, sejajar dengan hero card):
* Render dari `mockKpiSummary` (bagian 2 di atas)
* Setiap card: label, angka besar, indikator kecil di bawahnya (trend/status), dan teks "Showing 10 of 1,284 entries" dengan ikon chevron di pojok kanan bawah card (ini elemen visual saja dari desain Stitch, tidak perlu logic pagination sungguhan di tahap ini)

**Section "Recent Risk Activity"** (tabel di bawah, full width):
* Header section dengan judul "Recent Risk Activity" dan link "View Full Register" di kanan (untuk sekarang, link ini juga cukup munculkan notifikasi "Coming Soon" yang sama seperti tombol View Full Dashboard — lihat bagian 5)
* Tabel dengan kolom: ID, Risk Subject, Status, Inherent Risk, Last Updated, Actions
* Render dari `mockRiskRegister` (10 baris data dummy)
* Kolom ID berupa link (warna teal, sesuai desain) — untuk sekarang belum perlu mengarah ke halaman detail sungguhan (Assessment Detail belum dibangun), cukup munculkan notifikasi "Coming Soon" juga saat diklik
* Kolom Actions: ikon tiga titik (vertical ellipsis dari lucide-react) — untuk sekarang tidak perlu dropdown menu berfungsi, cukup ikon visual

**Footer kecil di bawah tabel:**
* Teks "Showing 10 of 1,284 entries" (statis, sesuai desain — meski data dummy aslinya cuma 10, biarkan angka "1,284" ini tetap sebagai elemen visual dummy yang konsisten dengan desain Stitch, JANGAN diubah jadi "Showing 10 of 10")
* Pagination visual (1, 2, 3, ..., 129) — visual saja, tidak perlu logic pagination sungguhan untuk tahap ini, karena data sungguhan baru 10 baris

---

## 4. Styling badge Status dan Risk Rating

Gunakan token warna yang SAMA dengan yang sudah didefinisikan di `globals.css` dari instruksi-instruksi sebelumnya (status badge colors dan risk-level colors dari Identitas Visual) — JANGAN buat warna baru.

Pemetaan status ke warna (mengacu ke Identitas Visual yang sudah ada):
* Draft → abu (#8A93A0 / bg #EEF0F2)
* Submitted → biru (#2D7DD2 / bg #E8F1FC)
* Reviewed → ungu (#6E5BC4 / bg #EFEBFA)
* Approved → hijau (#2E9E5B / bg #E6F6EC)
* Rejected → merah (#D33A3A / bg #FCE6E6)

Pemetaan risk rating ke warna (mengacu ke risk-level color):
* Low → hijau (#2E9E5B / bg #E6F6EC)
* Medium → kuning (#E5B400 / bg #FFF6DD)
* High → oranye (#E67A1F / bg #FFEEDD)
* Very High → merah (#D33A3A / bg #FCE6E6)

Buat helper function kecil (boleh ditaruh di `lib/data/risk-register.ts` juga atau file utils) untuk memetakan status/rating ke className Tailwind, supaya tidak perlu menulis ulang if-else di setiap tempat badge dirender:

```ts
export function getStatusBadgeStyle(status: RiskStatus): string {
  const map: Record<RiskStatus, string> = {
    Draft: "text-[#8A93A0] bg-[#EEF0F2]",
    Submitted: "text-[#2D7DD2] bg-[#E8F1FC]",
    Reviewed: "text-[#6E5BC4] bg-[#EFEBFA]",
    Approved: "text-[#2E9E5B] bg-[#E6F6EC]",
    Rejected: "text-[#D33A3A] bg-[#FCE6E6]",
  };
  return map[status];
}

export function getRiskRatingBadgeStyle(rating: RiskRating): string {
  const map: Record<RiskRating, string> = {
    Low: "text-[#2E9E5B] bg-[#E6F6EC]",
    Medium: "text-[#E5B400] bg-[#FFF6DD]",
    High: "text-[#E67A1F] bg-[#FFEEDD]",
    "Very High": "text-[#D33A3A] bg-[#FCE6E6]",
  };
  return map[rating];
}
```

Catatan: kalau warna-warna ini sudah ada sebagai CSS variable di `globals.css` dari pekerjaan sebelumnya, gunakan variable tersebut (misalnya `var(--status-draft)`) alih-alih hardcode hex langsung di sini — cek dulu sebelum menulis.

---

## 5. Notifikasi "Coming Soon" — dipakai berulang di 3 tempat

Tombol "View Full Dashboard" di top header, link "View Full Register", dan klik kolom ID — ketiganya untuk sekarang cukup memunculkan notifikasi kecil "Coming Soon", bukan navigasi sungguhan.

Cek dulu apakah project sudah punya komponen toast/notification (banyak setup shadcn/ui menyertakan komponen `toast` atau `sonner`). Kalau sudah ada, pakai itu. Kalau belum ada, install komponen toast dari shadcn/ui (`npx shadcn@latest add sonner` atau `toast`, sesuaikan dengan versi yang dipakai project), lalu gunakan untuk menampilkan pesan singkat seperti "Full Dashboard is coming soon" saat elemen-elemen di atas diklik.

Jangan pakai `alert()` browser bawaan — ini sudah jadi prinsip konsisten dari instruksi-instruksi sebelumnya (Login/Forgot Password juga menghindari alert browser untuk error state).

---

## 6. Yang TIDAK perlu dikerjakan di tahap ini

* Tidak perlu navigasi sungguhan ke Full Dashboard — route-nya boleh sudah ada/disiapkan, tapi tombolnya untuk sekarang hanya munculkan toast "Coming Soon"
* Tidak perlu logic pagination sungguhan di tabel maupun KPI card — elemen visual saja
* Tidak perlu dropdown menu berfungsi di kolom Actions (ikon tiga titik)
* Tidak perlu menghitung KPI summary secara dinamis dari data — biarkan statis seperti di bagian 2
* Tidak perlu halaman detail risk sungguhan saat kolom ID diklik — toast "Coming Soon" saja
* Tidak perlu fungsi import file Risk Register sungguhan — itu modul terpisah nanti, di sini cukup pastikan struktur data (`RiskRegisterEntry`) sudah dirancang kompatibel untuknya

---

## 7. Definition of Done

1. Halaman `/dashboard` menampilkan Mini Dashboard sesuai layout di bagian 3 — hero welcome card, 4 KPI card, tabel Recent Risk Activity dengan 10 baris data dummy
2. Nama user di heading welcome diambil dari `useCurrentUser()`, bukan hardcoded
3. Badge Status dan Inherent Risk Rating di tabel menggunakan warna yang sesuai dengan Identitas Visual (status colors dan risk-level colors)
4. Klik tombol "View Full Dashboard", link "View Full Register", atau kolom ID manapun di tabel memunculkan toast "Coming Soon" — bukan alert browser, bukan navigasi
5. Struktur data di `lib/data/risk-register.ts` memakai type `RiskRegisterEntry` dan `RiskStatus`/`RiskRating` sebagai union type, bukan `string` bebas
6. Tidak ada console error terkait TypeScript type-checking saat `npm run build`
7. Layout tidak pecah di lebar viewport 1280px–1440px, dan area tabel bisa di-scroll dengan benar di dalam `<main>` tanpa merusak posisi sidebar/header (sesuai catatan scroll dari instruksi App Shell sebelumnya)