# Instruksi Implementasi — Forgot Password Page
## Update dari PRD awal, disesuaikan dengan kode nyata project SentinelRisk PNM

**Konteks:** Dokumen ini menggantikan bagian 4 di PRD sebelumnya. Login Page sudah selesai dibangun, dan dari situ kita tahu pola nyata yang dipakai project ini. Instruksi di bawah dibuat agar Forgot Password Page konsisten 1:1 dengan kode Login yang sudah ada — bukan instruksi generik lagi.

**Fakta project yang sudah dikonfirmasi (ikuti ini, jangan menyimpang):**
* Next.js App Router versi terbaru — ada `AGENTS.md` yang memperingatkan API mungkin berbeda dari training data. Kalau ragu soal sintaks Next.js tertentu, cek `node_modules/next/dist/docs/` dulu sebelum menulis kode, jangan asumsi dari memori.
* Tailwind v4 — design token warna ada di `globals.css` sebagai CSS variable, BUKAN di `tailwind.config.ts`. Gunakan ulang variable yang sudah ada di sana, jangan buat token warna baru.
* `lib/mock/auth.ts` sudah punya fungsi `mockForgotPassword(_identifier: string)` yang SELALU return `{ success: true }` — jangan ubah logic ini, ini sengaja untuk mencegah account enumeration.
* `lib/validations/auth.ts` sudah punya `loginSchema` — tambahkan `forgotPasswordSchema` ke file yang sama ini, jangan buat file baru.
* Folder route `app/forgot-password/` sudah ada (kemungkinan masih kosong/skeleton).

---

## 1. Cek dulu sebelum mulai

Sebelum menulis kode, baca isi `lib/validations/auth.ts` untuk melihat apakah `forgotPasswordSchema` sudah ada (kemungkinan sudah dibuat otomatis bersamaan dengan `mockForgotPassword`, mengingat dua-duanya biasanya ditulis berpasangan). Kalau sudah ada, pakai yang sudah ada — jangan tulis ulang. Kalau belum, buat dengan pola yang sama seperti `loginSchema`:

```ts
export const forgotPasswordSchema = z.object({
  identifier: z.string().min(3, "Username atau email wajib diisi"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
```

## 2. Struktur komponen — ikuti pola `app/login/page.tsx` persis

Buat `app/forgot-password/page.tsx` dengan struktur dan urutan import yang sama persis gayanya dengan Login Page:

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth";
import { mockForgotPassword } from "@/lib/mock/auth";
```

Catatan: TIDAK perlu `useRouter` di halaman ini (berbeda dari Login), karena setelah submit kita tidak redirect — kita ganti konten card jadi pesan konfirmasi di tempat yang sama. Lihat bagian 4.

State yang dibutuhkan di komponen, ikuti pola penamaan yang sama seperti di Login (`globalError`, `showPassword` style):

```tsx
const [isSubmitted, setIsSubmitted] = useState(false);
const [globalError, setGlobalError] = useState<string | null>(null);
```

## 3. Layout — gunakan komponen shadcn yang sudah di-install

Reuse `components/ui/card.tsx`, `button.tsx`, `input.tsx`, `label.tsx` yang sudah ada — jangan buat komponen card/button baru dari nol.

Layout: centered card di tengah viewport (BUKAN split-screen seperti Login). Cek dulu apakah Login Page punya wrapper/layout component (misalnya `AuthLayout` di `components/`) yang reusable. Kalau Login dibangun dengan layout terpisah yang reusable, Forgot Password sebaiknya pakai layout yang sama tapi dengan prop/variant untuk versi "centered" (bukan "split"). Kalau Login dibangun langsung di dalam `page.tsx` tanpa layout terpisah, Forgot Password juga ditulis mandiri di `page.tsx`-nya sendiri dengan cara yang sama, cukup sesuaikan struktur layoutnya jadi centered card.

Konten dalam card:
* Title: "Reset your password"
* Deskripsi: "Enter your registered email or username. Password reset instructions will be sent according to internal security policy."
* Field: Username/Email (pakai `Input` dan `Label` dari shadcn yang sudah ada, style sama seperti field identifier di Login)
* Tombol primer: "Submit Request" — style sama seperti tombol "Sign In" di Login (warna, disabled state saat submitting, loading spinner saat proses)
* Link: "Back to Sign In" → `<Link href="/login">`
* Security note kecil di bawah: "For security reasons, password reset requests may require administrator approval." — pakai warna text secondary yang sama seperti security notice di Login

## 4. Logic submit dan success state — bagian paling berbeda dari Login

Karena `mockForgotPassword` SELALU return success, alur ini lebih sederhana dari Login (tidak ada error state dari hasil mock). Tapi tetap perlu loading state.

```tsx
async function onSubmit(values: ForgotPasswordFormValues) {
  setGlobalError(null);
  const result = await mockForgotPassword(values.identifier);
  if (result.success) {
    setIsSubmitted(true);
  }
}
```

Setelah `isSubmitted` jadi `true`, ganti seluruh isi card (bukan tampilkan di bawah form, tapi GANTI total) menjadi:
* Pesan: "Request submitted. Check your email or wait for admin approval."
* Tombol "Back to Sign In" di bawah pesan tersebut

Gunakan conditional render sederhana di dalam card:

```tsx
{isSubmitted ? (
  <SuccessMessage />
) : (
  <ForgotPasswordForm />
)}
```

Pecah jadi dua bagian render ini di dalam komponen yang sama (tidak perlu file komponen terpisah, cukup dua blok JSX yang dipisah dengan ternary di atas), supaya transisi terasa instan tanpa reload halaman.

## 5. Yang TIDAK perlu dikerjakan (sama seperti PRD awal, ditegaskan ulang)

* Tidak perlu validasi apakah email/username benar-benar ada di sistem — `mockForgotPassword` sengaja tidak melakukan ini
* Tidak perlu kirim email sungguhan — ini murni mock
* Tidak perlu redirect otomatis setelah sukses — biarkan user klik "Back to Sign In" secara manual

## 6. Definition of Done — khusus halaman ini

1. Route `/forgot-password` tampil dengan layout centered card, konsisten secara visual (warna, font, spacing) dengan Login Page
2. Validasi field identifier berjalan sesuai `forgotPasswordSchema` (pesan error inline kalau kosong/kurang dari 3 karakter)
3. Saat submit, tombol menunjukkan loading state (disabled + spinner) selama proses `mockForgotPassword` berjalan
4. Setelah berhasil, card berganti total menjadi pesan konfirmasi sukses, tanpa redirect otomatis
5. Link "Back to Sign In" dari pesan sukses maupun dari form (sebelum submit) mengarah balik ke `/login`
6. Tidak ada console error atau warning terkait hydration/client-server mismatch
