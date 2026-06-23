# PRD — Login Page & Forgot Password Page
## SentinelRisk PNM — IT Risk Management System

**Tujuan dokumen:** PRD teknis ini menjadi baseline untuk membangun frontend Login Page dan Forgot Password Page di Google Antigravity. Desain visual sudah selesai dibuat di Google Stitch — dokumen ini menerjemahkan desain tersebut menjadi spesifikasi yang bisa dieksekusi langsung oleh coding agent menjadi kode.

**Cara pakai dokumen ini di Antigravity:** Paste seluruh dokumen ini sebagai instruksi awal ke agent, lalu lampirkan juga screenshot/export hasil desain dari Stitch sebagai referensi visual. Agent akan punya dua sumber: PRD ini untuk struktur teknis/logic, dan screenshot untuk detail visual presisi (spacing, posisi elemen) yang sulit dijelaskan lewat teks.

---

## 1. TECH STACK

* **Framework:** React + Next.js (App Router, versi stabil terbaru)
* **Bahasa:** TypeScript (bukan JavaScript biasa) — supaya struktur data form, validasi, dan props antar komponen lebih aman dari bug saat aplikasi berkembang ke 11 modul lainnya
* **Styling:** Tailwind CSS
* **Component base:** shadcn/ui untuk komponen dasar (Button, Input, Checkbox, Card, Label) — agent boleh install komponen shadcn yang relevan, lalu kustomisasi warnanya sesuai design token di bagian 2
* **Form handling & validasi:** React Hook Form + Zod (Zod untuk schema validasi, supaya aturan validasi terpusat dan reusable untuk halaman lain nanti)
* **Routing:** Next.js App Router — buat route `/login` dan `/forgot-password`

Catatan untuk agent: gunakan struktur folder Next.js App Router standar (`app/login/page.tsx`, `app/forgot-password/page.tsx`). Komponen yang reusable (misalnya AuthLayout, FormField wrapper) ditaruh di `components/` agar bisa dipakai ulang.

---

## 2. DESIGN TOKEN (diturunkan dari Identitas Visual Stitch)

Implementasikan sebagai Tailwind config custom colors, bukan hardcoded hex di tiap komponen, supaya konsisten dan mudah diubah di satu tempat.

```js
// tailwind.config.ts — tambahkan ke theme.extend.colors
colors: {
  brand: {
    deepBlue: '#0B2A4A',
    teal: '#0E7C86',
  },
  bg: {
    base: '#F7F9FA',
  },
  border: {
    soft: '#D8DEE3',
  },
  text: {
    primary: '#1A1F26',
    secondary: '#5B6573',
  },
  status: {
    error: '#D33A3A',
    errorBg: '#FCE6E6',
  }
}
```

**Tipografi:** Font family Inter (import via `next/font/google`). Heading 18–28px semi-bold/bold, body text 15–16px regular untuk form.

**Komponen visual:** rounded corner 12px untuk card, shadow lembut (`shadow-md` Tailwind atau custom shadow tipis), border menggunakan warna `border-soft`.

**Resolusi target:** desktop-first, rancang untuk 1440px, tetap readable hingga 1280px. Untuk dua halaman ini, tidak perlu mobile-responsive penuh dulu (auth page biasanya tetap diakses dari desktop di konteks internal enterprise), tapi pastikan tidak rusak total di lebar di bawah 1024px (minimal: split-screen berubah jadi single column).

---

## 3. HALAMAN 1 — LOGIN PAGE (`/login`)

### 3.1 Struktur layout

Split-screen, dua kolom:
* **Kolom kiri (±55-60% lebar):** branding panel — nama produk "SentinelRisk PNM", subtitle, elemen visual (heatmap mini ilustratif memakai warna risk-level), teks "Cycle 1 – Core IT Risk Management". Background gradient dari `brand.deepBlue` ke `brand.teal`.
* **Kolom kanan (±40-45% lebar):** login card — putih, di-tengah secara vertikal, max-width sekitar 420px.

Pada lebar viewport di bawah 1024px: kolom kiri disembunyikan (`hidden md:flex` di Tailwind), kolom kanan jadi full width.

### 3.2 Form fields & validasi

| Field | Tipe | Validasi |
|---|---|---|
| Email/Username | text input | required; jika mengandung "@" validasi sebagai format email, jika tidak treat sebagai username (minimal 3 karakter) |
| Password | password input (dengan toggle show/hide) | required; minimal 8 karakter |
| Remember me | checkbox | optional, default unchecked |

Schema validasi (Zod), letakkan di `lib/validations/auth.ts`:

```ts
import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(3, "Username atau email wajib diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
```

### 3.3 Komponen dan elemen interaktif

* Tombol primer "Sign In" — full width, warna `brand.deepBlue`, disabled saat form belum valid atau saat proses submit berlangsung (tampilkan loading spinner di dalam tombol saat state submitting)
* Tombol sekunder "Sign in with Corporate SSO" — outline style, di bawah tombol primer, dipisah dengan divider bertuliskan "OR"
* Link "Forgot password?" — di bawah field Password, mengarah ke route `/forgot-password`
* Security notice text kecil di bagian bawah card: "Authorized users only. All activities are monitored and logged." — warna `text.secondary`, font size kecil (12-13px)

### 3.4 State yang harus diimplementasikan

Karena belum ada backend, gunakan **mock authentication** dengan logic sederhana:

* **Idle state** — form kosong, tombol Sign In disabled sampai field required terisi dan valid
* **Loading/submitting state** — saat tombol Sign In diklik, set state `isSubmitting = true`, tombol berubah jadi spinner, disable semua input selama proses (gunakan `setTimeout` 800-1200ms untuk simulasi network delay, lalu resolve ke success atau error)
* **Error state** — kalau mock validasi gagal (lihat skenario mock di bawah), tampilkan pesan error inline berwarna `status.error` di bawah field yang relevan, JANGAN gunakan popup/alert browser
* **Success state** — kalau mock berhasil, redirect ke `/dashboard` (halaman ini belum ada — buat saja placeholder page kosong bertuliskan "Dashboard — Coming Soon" supaya flow redirect bisa diuji)

**Skenario mock login (taruh di `lib/mock/auth.ts`):**

```ts
// Simulasi sederhana: kredensial valid hardcoded untuk testing UI
const MOCK_VALID_CREDENTIALS = {
  identifier: "admin@pnm.co.id",
  password: "Password123",
};

export async function mockLogin(identifier: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (identifier === MOCK_VALID_CREDENTIALS.identifier && password === MOCK_VALID_CREDENTIALS.password) {
    return { success: true };
  }
  return { success: false, error: "Username/email atau password salah." };
}
```

Catatan untuk agent: struktur fungsi mock ini sengaja dipisah di file sendiri (`lib/mock/auth.ts`) supaya nanti, saat backend API sungguhan sudah siap, fungsi ini bisa diganti dengan API call sungguhan tanpa mengubah komponen UI sama sekali — komponen hanya memanggil fungsi `mockLogin`, jadi tinggal ganti isi fungsinya saja nanti.

---

## 4. HALAMAN 2 — FORGOT PASSWORD PAGE (`/forgot-password`)

### 4.1 Struktur layout

Konsisten dengan identitas visual Login Page, tapi layout lebih sederhana: centered card di tengah viewport (tidak perlu split-screen penuh seperti login), dengan logo/nama produk kecil di atas card.

### 4.2 Form fields & validasi

| Field | Tipe | Validasi |
|---|---|---|
| Email/Username | text input | required, sama seperti aturan di Login |

Schema (tambahkan ke `lib/validations/auth.ts`):

```ts
export const forgotPasswordSchema = z.object({
  identifier: z.string().min(3, "Username atau email wajib diisi"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
```

### 4.3 Komponen dan elemen interaktif

* Title: "Reset your password"
* Deskripsi: "Enter your registered email or username. Password reset instructions will be sent according to internal security policy."
* Tombol primer "Submit Request" — sama styling dengan tombol Sign In di Login
* Link sekunder "Back to Sign In" — mengarah ke `/login`
* Security note: "For security reasons, password reset requests may require administrator approval."

### 4.4 State yang harus diimplementasikan

* **Idle state** — form kosong, tombol disabled sampai field terisi valid
* **Loading state** — sama pola dengan Login, simulasi delay 800-1000ms
* **Success state** — JANGAN redirect. Ganti seluruh konten card menjadi pesan konfirmasi: "Request submitted. Check your email or wait for admin approval." dengan tombol "Back to Sign In" di bawahnya. Ini penting secara keamanan: jangan beri tahu apakah email/username yang dimasukkan benar-benar ada di sistem atau tidak — pesan sukses ditampilkan terlepas dari valid atau tidaknya identifier yang dimasukkan (mencegah enumerasi akun)

**Mock function (tambahkan ke `lib/mock/auth.ts`):**

```ts
export async function mockForgotPassword(identifier: string) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  // Selalu return success terlepas dari valid/tidaknya identifier,
  // sesuai prinsip keamanan: tidak boleh konfirmasi/sangkal keberadaan akun
  return { success: true };
}
```

---

## 5. YANG TIDAK PERLU DIKERJAKAN DI TAHAP INI (eksplisit, supaya agent tidak over-build)

* Tidak perlu implementasi SSO sungguhan — tombol "Sign in with Corporate SSO" cukup ada secara visual dan bisa diklik, tapi cukup tampilkan `console.log` atau toast "SSO integration coming soon" saat diklik
* Tidak perlu sistem session/token sungguhan (JWT, cookie auth) — cukup state lokal untuk keperluan testing redirect
* Tidak perlu halaman Dashboard sungguhan — cukup placeholder kosong sebagai tujuan redirect
* Tidak perlu rate limiting atau lockout setelah gagal login berkali-kali — itu logic backend, bukan scope frontend tahap ini
* Tidak perlu integrasi backend nyata — semua menggunakan mock function yang sudah disiapkan di atas

---

## 6. DEFINITION OF DONE

Tahap ini dianggap selesai kalau:

1. Route `/login` dan `/forgot-password` bisa diakses dan tampil sesuai desain Stitch (warna, layout, tipografi)
2. Form di kedua halaman tervalidasi sesuai schema Zod di atas, dengan pesan error inline yang sesuai (bukan alert browser)
3. Loading state terlihat jelas saat submit (tombol berubah jadi spinner, input ter-disable)
4. Login dengan kredensial mock yang benar (`admin@pnm.co.id` / `Password123`) berhasil redirect ke `/dashboard` placeholder
5. Login dengan kredensial salah menampilkan error inline tanpa redirect
6. Forgot Password selalu menampilkan pesan sukses setelah submit, terlepas dari identifier yang dimasukkan
7. Link antar halaman (`Forgot password?` dan `Back to Sign In`) berfungsi dua arah
8. Tidak ada console error di browser saat menjalankan kedua halaman
