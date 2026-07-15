# PRD: AI Quiz Generator AI

## Tujuan

Aplikasi web AI Quiz Generator dengan mekasinme PDF yang diupload lalu secara otomatis menghasilkan quiz dari file tersebut

## Latar Belakang

Terbuka bagi yang membutuhkan self learner dari materi PDF tanpa perlu pusing untuk membuat quiz manual.

## Scope

- Upload PDF -> ekstrak teks (backend).
- Generate quiz (MCQ/True-False) via AI API.
- Simpan quiz di DB.
- Tampilkan UI quiz oleh frontend NextJS.

## User

- Self Learner (ofc humans)
  
## Fitur Utama

1. Upload PDF (FE -> BE).
2. Ekstraksi Teks (Express Services).
3. Generate Quiz (AI API).
4. Simpan & tampilkan quiz (DB + FE).
5. ?

## Success Metrics

- Minimal 10 soal valid per PDF.
- Waktu Proses < 30 detik.
- UI Simple, mobile friendly.

## Timeline

- Minggu 1-2: Setup Monorepo, PDF parsing.
- Minggu 3-4: Integrasi AI API.
- Minggu 5: UI Nextjs quiz page.
- Minggu 6: Testing & Release beta.
