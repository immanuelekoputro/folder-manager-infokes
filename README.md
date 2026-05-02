# Infokes

Monorepo berisi dua project:

| Project | Tech | Port |
|---|---|---|
| `be-infokes` | Elysia + Bun + Drizzle | `3000` |
| `vue-infokes` | Vue 3 + Vite + Pinia | `5173` |

---

## Prerequisites

- [Node.js v23](https://nodejs.org) via nvm
- [Bun](https://bun.sh)
- [pnpm](https://pnpm.io)
- MySQL (lokal atau Docker)

---

## Setup Database

> Buat database `infokes` terlebih dahulu sebelum menjalankan project.

```sql
CREATE DATABASE infokes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Buat Tabel

Jalankan script DDL dari file `seed/table.sql`:

```sh
mysql -u root -p infokes < seed/table.sql
```

### Seed Data

Setelah tabel dibuat, isi data awal dengan:

```sh
mysql -u root -p infokes < seed/files_202605030613.sql
```

---

## Instalasi Dependencies

```sh
nvm use 23
pnpm install
```

---

## Development

Jalankan kedua server sekaligus dari root monorepo:

```sh
nvm use 23
pnpm dev
```

- Backend tersedia di: `http://localhost:3000`
- Frontend tersedia di: `http://localhost:5173`

---

## Production

```sh
# Build frontend (vue-infokes)
pnpm build

# Jalankan semua service
pnpm start
```

- Backend: `http://localhost:3000`  
- Frontend: `http://localhost:5173` (via `vite preview`)
